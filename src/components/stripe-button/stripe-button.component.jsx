import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishablekey = "pk_test_fYDPKJ3o3sMhE4Vjoa1B9XJ800ciOaiNfQ";
  const onToken = token => {
    console.log(token);
    alert("Payment Successful.");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Shaaj Poshak Clothing Ltd."
      shippingAddress
      billingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishablekey}
    />
  );
};

export default StripeCheckoutButton;
