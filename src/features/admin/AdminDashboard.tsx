"use client"

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { getProducts } from "@/features/products/services"
import type { AdminProduct, AuditEntry } from "./admin-tools"
import {
  ADMIN_AUDIT_KEY,
  ADMIN_PRODUCTS_KEY,
  createAuditEntry,
  readStoredValue,
} from "./admin-tools"
import { getDemoOrders, updateDemoOrderStatus } from "@/features/orders/demo-orders-service"
import type { Order, OrderStatus } from "@/features/orders/types"

type View = "products" | "categories" | "inventory" | "orders" | "history"
type ProductDraft = Pick<AdminProduct, "title" | "category" | "price" | "stock" | "thumbnail">

const PAGE_SIZE = 6
const emptyDraft: ProductDraft = {
  title: "",
  category: "",
  price: 0,
  stock: 0,
  thumbnail: "",
}

const AdminDashboard = () => {
  // Dashboard state covers the active view, product editor, inventory dialog, and order list.
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [audit, setAudit] = useState<AuditEntry[]>([])
  const [view, setView] = useState<View>("products")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("title")
  const [page, setPage] = useState(1)
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [inventoryProduct, setInventoryProduct] = useState<AdminProduct | null>(null)
  const [inventoryValue, setInventoryValue] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [formError, setFormError] = useState("")
  const [status, setStatus] = useState("")
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading")
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Load the editable demo catalog and audit trail when the dashboard mounts.
    const load = async () => {
      try {
        const storedProducts = readStoredValue<AdminProduct[]>(ADMIN_PRODUCTS_KEY, [])
        const initialProducts = storedProducts.length ? storedProducts : await getProducts()
        setProducts(initialProducts)
        setAudit(readStoredValue<AuditEntry[]>(ADMIN_AUDIT_KEY, []))
        setOrders(getDemoOrders())
        setLoadState("ready")
      } catch {
        setLoadState("error")
      }
    }

    void load()
  }, [])

  useEffect(() => {
    // Orders are fetched separately because catalog editing can still work if they fail.
    if (loadState !== "ready") return
    localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(products))
    localStorage.setItem(ADMIN_AUDIT_KEY, JSON.stringify(audit))
  }, [audit, loadState, products])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    // Apply search, category, and sorting before taking the current page slice.
    const normalizedQuery = query.trim().toLowerCase()
    return products
      .filter((product) =>
        (category === "all" || product.category === category)
        && product.title.toLowerCase().includes(normalizedQuery))
      .sort((left, right) => {
        if (sort === "price") return left.price - right.price
        if (sort === "stock") return left.stock - right.stock
        return left.title.localeCompare(right.title)
      })
  }, [category, products, query, sort])

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount))
  }, [pageCount])

  const record = (action: string, product: string) => {
    // Keep a lightweight local audit entry for every catalog mutation.
    setAudit((current) => [createAuditEntry(action, product), ...current])
  }

  const updateOrder = (orderId: string, orderStatus: OrderStatus) => {
    updateDemoOrderStatus(orderId, orderStatus)
    setOrders(getDemoOrders())
    setStatus(`Order marked ${orderStatus}.`)
  }

  const openCreate = () => {
    setEditingId(null)
    setDraft(emptyDraft)
    setFormError("")
    setFormOpen(true)
  }

  const openEdit = (product: AdminProduct) => {
    setEditingId(product.id)
    setDraft(product)
    setFormError("")
    setFormOpen(true)
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setDraft((current) => ({ ...current, thumbnail: String(reader.result) }))
    reader.readAsDataURL(file)
  }

  const saveProduct = (event: FormEvent) => {
    // The same form creates new products or replaces the currently edited product.
    event.preventDefault()
    const title = draft.title.trim()
    const productCategory = draft.category.trim()

    if (!title || !productCategory || draft.price <= 0 || draft.stock < 0) {
      setFormError("Enter a name, category, positive price, and non-negative stock.")
      return
    }

    if (editingId !== null) {
      setProducts((current) => current.map((product) =>
        product.id === editingId
          ? { ...product, ...draft, title, category: productCategory, updatedAt: new Date().toISOString() }
          : product))
      record("Product updated", title)
    } else {
      const id = Math.max(0, ...products.map((product) => product.id)) + 1
      setProducts((current) => [{
        ...draft,
        id,
        title,
        category: productCategory,
        description: "Frontend demo product",
        discountPercentage: 0,
        rating: 0,
        brand: "Shopella",
        images: draft.thumbnail ? [draft.thumbnail] : [],
      }, ...current])
      record("Product created", title)
    }

    setFormOpen(false)
    setStatus("Demo changes saved locally.")
  }

  const removeProduct = (product: AdminProduct) => {
    if (!window.confirm(`Delete "${product.title}" from this local demo?`)) return
    setProducts((current) => current.filter((item) => item.id !== product.id))
    record("Product deleted", product.title)
    setStatus("Product deleted from the local demo.")
  }

  const saveInventory = (event: FormEvent) => {
    // Inventory uses a focused dialog so stock can change without editing product metadata.
    event.preventDefault()
    if (!inventoryProduct || inventoryValue < 0) return
    setProducts((current) => current.map((product) =>
      product.id === inventoryProduct.id ? { ...product, stock: inventoryValue } : product))
    record(`Inventory changed to ${inventoryValue}`, inventoryProduct.title)
    setInventoryProduct(null)
    setStatus("Inventory adjusted locally.")
  }

  if (loadState === "loading") {
    return <div className="admin-state" role="status">Loading admin catalogue…</div>
  }

  if (loadState === "error") {
    return <div className="admin-state" role="alert">The demo catalogue could not be loaded.</div>
  }

  return (
    <section className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div>
          <p className="admin-eyebrow">Frontend demo</p>
          <h1>Shopella admin</h1>
          <p>DummyJSON catalogue with local, non-persistent backend simulation.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={openCreate}>Add product</button>
      </header>

      <aside className="admin-info" aria-labelledby="admin-info-title">
        <strong id="admin-info-title">Admin demo</strong>
        <p>Add or edit products, change images and stock, or review changes in History. Everything is stored only in this browser.</p>
      </aside>

      <nav className="admin-nav" aria-label="Admin sections">
        {(["products", "categories", "inventory", "orders", "history"] as View[]).map((item) => (
          <button
            className={view === item ? "admin-nav__button admin-nav__button--active" : "admin-nav__button"}
            key={item}
            type="button"
            onClick={() => setView(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      {status ? <p className="admin-status" role="status">{status}</p> : null}

      {view === "products" || view === "inventory" ? (
        <>
          <div className="admin-toolbar">
            <label>
              <span>Search</span>
              <input
                className="input-field"
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setPage(1) }}
              />
            </label>
            <label>
              <span>Category</span>
              <select
                className="input-field"
                value={category}
                onChange={(event) => { setCategory(event.target.value); setPage(1) }}
              >
                <option value="all">All</option>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Sort</span>
              <select className="input-field" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="title">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
              </select>
            </label>
          </div>

          {visibleProducts.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="admin-product">
                          {product.thumbnail
                            ? <img src={product.thumbnail} alt="" />
                            : <span className="admin-product__placeholder" />}
                          <strong>{product.title}</strong>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="btn btn-secondary" type="button" onClick={() => openEdit(product)}>Edit</button>
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => {
                              setInventoryProduct(product)
                              setInventoryValue(product.stock)
                            }}
                          >
                            Stock
                          </button>
                          <button className="btn btn-danger" type="button" onClick={() => removeProduct(product)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <div className="admin-state">No matching products.</div>}

          <div className="admin-pagination" aria-label="Product pagination">
            <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {pageCount}</span>
            <button className="btn btn-secondary" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </>
      ) : null}

      {view === "categories" ? (
        <div className="admin-card-grid">
          {categories.map((item) => (
            <article className="admin-card" key={item}>
              <h2>{item}</h2>
              <p>{products.filter((product) => product.category === item).length} products</p>
            </article>
          ))}
        </div>
      ) : null}

      {view === "orders" ? (
        orders.length ? (
          <div className="admin-card-grid">
            {orders.map((order) => (
              <article className="admin-card" key={order.id}>
                <p className="admin-eyebrow">Demo order</p>
                <h2>{order.id}</h2>
                <p>{order.customer.name} · ${order.totals.total.toFixed(2)}</p>
                <div className={`order-status order-status--${order.status}`}>{order.status}</div>
                <div className="admin-actions">
                  {order.status === "pending" ? <button className="btn btn-primary" onClick={() => updateOrder(order.id, "paid")}>Approve demo payment</button> : null}
                  {order.status === "paid" ? <button className="btn btn-primary" onClick={() => updateOrder(order.id, "processing")}>Mark processing</button> : null}
                  {order.status === "processing" ? <button className="btn btn-primary" onClick={() => updateOrder(order.id, "shipped")}>Mark shipped</button> : null}
                  {!["shipped", "cancelled", "refunded"].includes(order.status) ? <button className="btn btn-secondary" onClick={() => updateOrder(order.id, "cancelled")}>Cancel</button> : null}
                  {["paid", "processing", "shipped"].includes(order.status) ? <button className="btn btn-secondary" onClick={() => updateOrder(order.id, "refunded")}>Refund</button> : null}
                </div>
              </article>
            ))}
          </div>
        ) : <div className="admin-state">No demo orders yet. Place an order from the storefront first.</div>
      ) : null}

      {view === "history" ? (
        audit.length ? (
          <ol className="admin-history">
            {audit.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.action}</strong>
                <span>{entry.product}</span>
                <time>{entry.date}</time>
              </li>
            ))}
          </ol>
        ) : <div className="admin-state">No demo changes recorded yet.</div>
      ) : null}

      {formOpen ? (
        <div className="admin-dialog-backdrop">
          <form className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="product-form-title" onSubmit={saveProduct}>
            <h2 id="product-form-title">{editingId === null ? "Add product" : "Edit product"}</h2>
            <label>Name<input className="input-field" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
            <label>Category<input className="input-field" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} /></label>
            <label>Price<input className="input-field" min="0.01" step="0.01" type="number" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} /></label>
            <label>Stock<input className="input-field" min="0" step="1" type="number" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: Number(event.target.value) })} /></label>
            <label>Product image<input className="input-field" accept="image/*" type="file" onChange={handleImage} /></label>
            {draft.thumbnail ? <img className="admin-image-preview" src={draft.thumbnail} alt="Product preview" /> : null}
            {formError ? <p className="admin-error" role="alert">{formError}</p> : null}
            <div className="admin-actions">
              <button className="btn btn-primary" type="submit">Save</button>
              <button className="btn btn-secondary" type="button" onClick={() => setFormOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : null}

      {inventoryProduct ? (
        <div className="admin-dialog-backdrop">
          <form className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="inventory-title" onSubmit={saveInventory}>
            <h2 id="inventory-title">Adjust inventory</h2>
            <p>{inventoryProduct.title}</p>
            <label>Available stock<input className="input-field" min="0" step="1" type="number" value={inventoryValue} onChange={(event) => setInventoryValue(Number(event.target.value))} /></label>
            <div className="admin-actions">
              <button className="btn btn-primary" type="submit">Save adjustment</button>
              <button className="btn btn-secondary" type="button" onClick={() => setInventoryProduct(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  )
}

export default AdminDashboard


