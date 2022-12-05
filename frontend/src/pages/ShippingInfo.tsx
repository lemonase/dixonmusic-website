import { Container } from "react-bootstrap";

function ShippingInfo() {
  return (
    <Container>
      <h2 className="body-heading">Shipping Info</h2>
      <div className="main-body-text">

        <h4 style={{ textAlign: "center" }}>
          🌟
          Discounts for larger orders (over 10 items)
          🌟
        </h4>

        <br></br>

        <h3>In-Stock Items and Tracking</h3>
        <p>
          All of our items are in stock and ready to ship with no waiting or
          delays - Within 1 hour (usually less) after you place your order, we
          will work on your order, we will e mail you by return with the
          shipping and availability status. And upon payment we will pack and
          have the shipping label and free tracking number (if available) ready
          to e mail to you.
        </p>


        <h3>Your Order</h3>
        <p>
          Your order will physically be on its way within 24
          hours (sometimes the same day you) It is rare but sometimes an item
          can be sold before we can update the listings, if we confirm the order
          then it is definitely available.
        </p>


        <h3>Returns</h3>
        <p>
          <b>● Important please note ● </b>
        </p>
        <p>
          <span>
            ● Opening of sealed LPs will void returns, as we
            cannot determine if the product/pressing is perfect to Play. We do not
            have any returns with our suppliers and so we cannot offer the same to
            you, the customer. Please read the comments on the product release,
            this should give you an idea of any Pressing faults. But not
            guaranteed, Thank You ●
          </span>
        </p>

        <h3>Shipping</h3>
        <p>
          USA Shipping - The above are the basic prices, these include tracking
          to your door, but not insurance or loss, If you need insurance or
          special services please ask for a quote before ordering and we will
          revise the shipping quote invoice by return. We cannot be held
          responsible for shipping damage or loss without the extra
          insurance/registered etc fees.
        </p>
      </div>
    </Container>
  );
}

export default ShippingInfo;
