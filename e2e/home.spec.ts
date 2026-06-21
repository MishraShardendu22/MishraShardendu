import { expect, test } from '@playwright/test'

test.describe('Admin Website', () => {
  test('should load the admin homepage', async ({ page }) => {
    // Only run if the project is Admin
    test.skip(test.info().project.name !== 'Admin-Desktop-Chrome', 'Skipping non-admin test')
    await page.goto('/')
    await expect(page).toHaveTitle(/Admin/i)
  })
})

test.describe('Blog Website', () => {
  test('should load the blog homepage', async ({ page }) => {
    // Only run if the project is Blog
    test.skip(test.info().project.name !== 'Blog-Desktop-Chrome', 'Skipping non-blog test')
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })
})
