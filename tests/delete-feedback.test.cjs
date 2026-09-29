const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const { test } = require("node:test");
const { chromium } = require("playwright");

const url = "http://127.0.0.1:4179/";

async function waitForServer(server, getOutput) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null)
      throw new Error(`The dev server exited before the test started: ${getOutput()}`);
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Wait for Vite to start listening.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Timed out waiting for the dev server");
}

test("feedback deletion requires confirmation and selects another item", async () => {
  const server = spawn(
    process.execPath,
    ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "4179", "--strictPort"],
    {
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let serverOutput = "";
  server.stdout.on("data", (chunk) => (serverOutput += chunk));
  server.stderr.on("data", (chunk) => (serverOutput += chunk));
  let browser;
  try {
    await waitForServer(server, () => serverOutput);
    browser = await chromium.launch({
      headless: true,
      ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH && {
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      }),
    });
    const page = await browser.newPage();
    page.on("pageerror", (error) => console.error("page error:", error));
    page.on("console", (message) => {
      if (message.type() === "error") console.error("console error:", message.text());
    });
    await page.goto(url);
    await page.waitForLoadState("networkidle");

    const selected = page.locator('button[aria-current="true"]');
    const initialItem = await selected.textContent();
    const initialCount = await page.locator("button[aria-current]").count();
    assert.ok(initialItem);
    assert.ok(initialCount > 1);

    await page.getByRole("button", { name: "Delete feedback" }).click();
    const dialog = page.getByRole("alertdialog");
    assert.equal(await dialog.count(), 1, "Clicking Delete feedback should open a dialog");
    await dialog.getByRole("button", { name: "Cancel" }).click();
    assert.equal(await page.locator("button[aria-current]").count(), initialCount);
    assert.equal(await selected.textContent(), initialItem);
    assert.equal(await page.getByText("Feedback deleted").count(), 0);

    await page.getByRole("button", { name: "Delete feedback" }).click();
    const confirmDelete = dialog.getByRole("button", { name: "Delete feedback" });
    assert.match(await confirmDelete.getAttribute("class"), /\bbg-destructive\b/);
    await confirmDelete.click();
    await page.waitForFunction(
      (count) => document.querySelectorAll("button[aria-current]").length === count - 1,
      initialCount,
    );
    assert.notEqual(await selected.textContent(), initialItem);
    await dialog.waitFor({ state: "hidden" });
    await page.getByText("Feedback deleted").waitFor();
  } finally {
    await browser?.close();
    server.kill();
  }
});
