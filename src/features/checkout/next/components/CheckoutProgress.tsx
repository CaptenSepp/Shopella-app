const CheckoutProgress = () => (
  <ol className="checkout-progress" aria-label="Checkout progress">
    <li className="checkout-progress__step checkout-progress__step--complete">1. Cart</li>
    <li className="checkout-progress__step checkout-progress__step--current" aria-current="step">2. Delivery</li>
    <li className="checkout-progress__step">3. Confirmation</li>
  </ol>
)

export default CheckoutProgress
