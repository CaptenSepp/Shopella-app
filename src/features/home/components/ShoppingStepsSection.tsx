import { Search, ShoppingBag, Sparkles } from "lucide-react"

const steps = [
  { icon: Search, title: "Discover", text: "Search and filter a focused catalogue." },
  { icon: Sparkles, title: "Choose", text: "Compare clear prices, ratings, and stock." },
  { icon: ShoppingBag, title: "Order", text: "Use one simple checkout and track your orders." },
]

const ShoppingStepsSection = () => (
  <section className="shopping-steps" aria-labelledby="shopping-steps-title">
    <p className="shopping-steps__eyebrow">Simple by design</p>
    <h2 id="shopping-steps-title" className="shopping-steps__title">How Shopella works</h2>
    <div className="shopping-steps__grid">
      {steps.map(({ icon: Icon, text, title }) => (
        <article key={title} className="shopping-steps__card">
          <Icon className="shopping-steps__icon" aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  </section>
)

export default ShoppingStepsSection
