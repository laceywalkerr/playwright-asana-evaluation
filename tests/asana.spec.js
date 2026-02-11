const { test, expect } = require('@playwright/test');

const testCases = [
  {
    area: "Web Application",
    column: "To Do",
    task: "Implement user authentication",
    tags: ["Feature", "High Priority"]
  },
  {
    area: "Web Application",
    column: "To Do",
    task: "Fix navigation bug",
    tags: ["Bug"]
  },
  {
    area: "Web Application",
    column: "In Progress",
    task: "Design system updates",
    tags: ["Design"]
  },
  {
    area: "Mobile Application",
    column: "To Do",
    task: "Push notification system",
    tags: ["Feature"]
  },
  {
    area: "Mobile Application",
    column: "In Progress",
    task: "Offline mode",
    tags: ["Feature", "High Priority"]
  },
  {
    area: "Mobile Application",
    column: "Done",
    task: "App icon design",
    tags: ["Design"]
  }
];

async function login(page) {
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
}

testCases.forEach(({ area, column, task, tags }) => {
  test(`Verify "${task}" is in "${column}" under "${area}"`, async ({ page }) => {
    await login(page);

    // Click area
    await page.getByRole('button', { name: area }).click();

    // Find the correct column container by heading
    const columnContainer = page
      .getByRole('heading', { level: 2, name: new RegExp(`^${column}`) })
      .locator('..'); // go up ONE level only

    await expect(columnContainer).toBeVisible();

    // Find the specific task card inside this column
    const taskCard = columnContainer
      .locator('.bg-white')
      .filter({ hasText: task });

    await expect(taskCard).toHaveCount(1);

    // Verify task title
    await expect(taskCard.getByRole('heading', { level: 3, name: task }))
      .toBeVisible();

    // Verify tags inside this task card only
    for (const tag of tags) {
      await expect(
        taskCard.getByText(tag, { exact: true })
      ).toBeVisible();
    }
  });
});
