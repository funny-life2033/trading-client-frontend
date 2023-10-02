import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);
  console.log(process.env.PAYPAL_CLIENT_ID);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AYSNpjgnqOdpMhvKzzPJPdU8bnU_pBGtk1wXnmrGAgRWc0ZdnN6BS38ly1xx19tv7m0CGo7Kt0SH3ext",
      }}
    >
      <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
};

export default Checkout;
