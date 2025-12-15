import { test, expect } from "@playwright/test";

test("Navigation toggles when clicking the button", async ({ page }) => {
    await page.goto("/");

    const navigation = page.getByRole("navigation", { name: "Main Navigation" })
    const button = navigation.getByRole("button");
    const navigationList = navigation.getByRole("list");

    await expect(button).toHaveAttribute("aria-controls", "navigation-items");

    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(navigationList).toBeVisible();

    await button.click();

    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(navigationList).toBeHidden();

    await button.click();

    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(navigationList).toBeVisible();
});

