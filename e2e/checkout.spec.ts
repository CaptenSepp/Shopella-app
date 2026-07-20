import { expect, test } from '@playwright/test'

const product = {
  id: 1, title: 'E2E Product', description: 'E2E description', price: 20,
  discountPercentage: 0, rating: 4.5, stock: 10, brand: 'E2E Brand',
  category: 'beauty', thumbnail: '/favicon.svg', images: ['/favicon.svg'],
}

test('sign in, browse, add to cart, and submit checkout', async ({ page }) => {
  await page.route('**/products/categories', (route) => route.fulfill({ json: [{ slug: 'beauty', name: 'Beauty' }] }))
  await page.route(/https:\/\/dummyjson\.com\/products(?:\?.*)?$/, (route) => route.fulfill({ json: { products: [product] } }))
  await page.route('**/test-supabase/auth/v1/token?grant_type=password', (route) => route.fulfill({
    json: {
      access_token: 'e2e-access-token', token_type: 'bearer', expires_in: 3600,
      refresh_token: 'e2e-refresh-token',
      user: { id: 'e2e-user', email: 'jane@example.com', user_metadata: { name: 'Jane Doe' }, aud: 'authenticated', role: 'authenticated' },
    },
  }))
  await page.route('**/api/orders', (route) => route.fulfill({
    status: 201,
    json: { id: 'order-e2e', createdAt: new Date().toISOString(), customer: { name: 'Jane Doe', email: 'jane@example.com', address: '123 Main Street' }, items: [{ ...product, quantity: 1 }], totals: { subtotal: 20, shipping: 4.99, total: 24.99 } },
  }))

  await page.goto('/products')
  await page.getByRole('button', { name: /add e2e product to cart/i }).click()
  await page.getByLabel('Open cart').first().click()
  await page.getByRole('button', { name: /check out/i }).click()

  // Checkout redirects guests to real authentication, then returns them to their order.
  const loginPage = page.locator('#main-content')
  await expect(page).toHaveURL(/\/login\?redirect=/)
  await loginPage.locator('#email').fill('jane@example.com')
  await loginPage.locator('#password').fill('password123')
  await loginPage.locator('button[type="submit"]').click()
  await expect(page.getByRole('heading', { name: 'Delivery details' })).toBeVisible()

  await page.locator('#main-content').getByLabel('Address').fill('123 Main Street')
  await page.getByRole('button', { name: /place order/i }).click()
  await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible()
})
