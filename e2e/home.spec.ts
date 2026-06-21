import { expect, test } from '@playwright/test'

test.describe('Admin Website', () => {
  test('should load the admin homepage', async ({ page }) => {
    test.skip(test.info().project.name !== 'Admin-Desktop-Chrome', 'Skipping non-admin test')
    await page.goto('/')
    await expect(page).toHaveTitle(/Admin/i)
    await expect(page).toHaveScreenshot('admin-homepage.png', { fullPage: true })
  })
})

test.describe('Blog Website', () => {
  test('should load the blog homepage', async ({ page }) => {
    test.skip(test.info().project.name !== 'Blog-Desktop-Chrome', 'Skipping non-blog test')
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
    await page.waitForTimeout(1000) // Wait for animations
    await expect(page).toHaveScreenshot('blog-homepage.png', { fullPage: true })
  })
})
