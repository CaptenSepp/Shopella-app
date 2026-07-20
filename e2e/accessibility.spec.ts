import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const product = {
  id: 1, title: 'Accessible Product', description: 'A clear product description', price: 20,
  discountPercentage: 0, rating: 4.5, stock: 10, brand: 'Shopella',
  category: 'beauty', thumbnail: '/favicon.svg', images: ['/favicon.svg'],
}

test.beforeEach(async ({ page }) => {
  await page.route('**/products/categories', (route) => route.fulfill({ json: [{ slug: 'beauty', name: 'Beauty' }] }))
  await page.route(/https:\/\/dummyjson\.com\/products(?:\?.*)?$/, (route) => route.fulfill({ json: { products: [product] } }))
})

for (const path of ['/products', '/login']) {
  test(`${path} has no serious automated accessibility violations`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('#main-content')).toBeVisible()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    const importantViolations = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))
    expect(importantViolations).toEqual([])
  })
}

test('assistant supports keyboard opening and Escape closing', async ({ page }) => {
  await page.goto('/products')
  const assistantButton = page.locator('button[aria-controls="assistant-panel"]')
  await expect(assistantButton).toBeVisible({ timeout: 15_000 })
  await assistantButton.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Shopella Assistant' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Shopella Assistant' })).toBeHidden()
})
