const CheckoutProgress = () => (
  <ol className="checkout-progress" aria-label="Checkout progress">
    <li className="checkout-progress__step checkout-progress__step--complete"><span className="checkout-progress__number" aria-hidden="true">1</span><span>Cart</span></li>
    <li className="checkout-progress__step checkout-progress__step--current" aria-current="step"><span className="checkout-progress__number" aria-hidden="true">2</span><span>Delivery & payment</span></li>
    <li className="checkout-progress__step"><span className="checkout-progress__number" aria-hidden="true">3</span><span>Confirmation</span></li>
  </ol>
)

export default CheckoutProgress
