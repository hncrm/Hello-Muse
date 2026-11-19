import { promises as fs } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const DATA_FILE = path.join(process.cwd(), "data", "enquiries.json");

// The valid-submission test writes a real enquiry record. Snapshot the
// file first and restore it afterwards so a test run never deletes or
// leaks real enquiries.
let snapshot: string | null = null;
let hadFile = false;

test.beforeAll(async () => {
  try {
    snapshot = await fs.readFile(DATA_FILE, "utf-8");
    hadFile = true;
  } catch {
    snapshot = null;
    hadFile = false;
  }
});

test.afterAll(async () => {
  if (hadFile && snapshot !== null) {
    await fs.writeFile(DATA_FILE, snapshot, "utf-8");
  } else {
    await fs.rm(DATA_FILE, { force: true });
  }
});

test("contact page shows the form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Let’s talk about your process" })).toBeVisible();
  await expect(page.getByLabel("Your name *")).toBeVisible();
  await expect(page.getByLabel("Work email *")).toBeVisible();
  await expect(page.getByLabel("What do you need help with? *")).toBeVisible();
  await expect(page.getByLabel("Tell us about your process *")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send my enquiry" })).toBeVisible();
});

test("submitting empty shows the error summary", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send my enquiry" }).click();
  await expect(page.getByText("There is a problem")).toBeVisible();
  await expect(page.getByText("Enter your name.")).toBeVisible();
});

test("an invalid email shows an inline error", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name *").fill("Alex Morgan");
  await page.getByLabel("Work email *").fill("not-an-email");
  await page.getByLabel("What do you need help with? *").selectOption("power-apps");
  await page
    .getByLabel("Tell us about your process *")
    .fill("We track jobs in spreadsheets and want a simple app for our team.");
  await page.getByRole("button", { name: "Send my enquiry" }).click();
  await expect(page.getByText("Enter an email address in the format name@company.com.")).toBeVisible();
});

test("a valid enquiry shows the confirmation with a reference", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name *").fill("Alex Morgan");
  await page.getByLabel("Work email *").fill("alex@company.com");
  await page.getByLabel("Company (optional)").fill("Morgan Plumbing Ltd");
  await page.getByLabel("What do you need help with? *").selectOption("power-apps");
  await page
    .getByLabel("Tell us about your process *")
    .fill("We track jobs in spreadsheets and want a simple app for our team.");
  await page.getByRole("button", { name: "Send my enquiry" }).click();
  await expect(page.getByText("Thank you, Alex — we've got your message.")).toBeVisible();
  await expect(page.getByText(/Your enquiry reference:/)).toBeVisible();
  await expect(page.getByText(/HHX-/)).toBeVisible();
});

test("deep link pre-selects the topic", async ({ page }) => {
  await page.goto("/contact?topic=power-apps");
  await expect(page.getByLabel("What do you need help with? *")).toHaveValue("power-apps");
});

test("unknown blog slug returns a real 404 (regression)", async ({ page }) => {
  const response = await page.goto("/blog/does-not-exist");
  expect(response?.status()).toBe(404);
});
