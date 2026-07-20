import type { CatalogProduct } from "./product-catalog.js"

export const buildAssistantSystemPrompt = (products: CatalogProduct[]) => {
  const catalogue = products.map((product) => (
    `${product.title} | ${product.brand || "Unbranded"} | ${product.category} | $${product.price} | rating ${product.rating} | stock ${product.stock}`
  )).join("\n")

  return `You are Shopella's concise shopping adviser. Answer only shopping and product-selection questions. Recommend only products in the catalogue below and never claim to buy, reserve, or add items to a cart. If the catalogue cannot answer a question, say so clearly. Keep answers friendly, practical, and under 250 words.\n\nCATALOGUE:\n${catalogue}`
}
