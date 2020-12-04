import React from 'react'
import { useParams } from "react-router-dom"
import logo from './img/qplogo.png'
import './App.css'

var stripe = window.Stripe('pk_test_51Hh4PTExKtPKw5yvleHfMcKOFOKLyf0AhX8KEeATqqjKaFE2d5dnGjEr8GlGGaVjRYEaQ0sBdIF0pU9wLBBPBYXQ00LtoX2Pbh');

export default function Subscription() {

  const myParams = useParams()
  console.log('subscription received:' + myParams.channel);
  console.log('subscription received:' + myParams.cust);

  // Handle any errors returned from Checkout
  var handleResult = function(result) {
    if (result.error) {
      alert(result.error.message);
      // var displayError = document.getElementById("error-message");
      // displayError.textContent = result.error.message;
    }
  };

  // Create a Checkout Session with the selected plan ID
  var createCheckoutSession = function(priceId, custId) {
    return fetch("http://localhost:3000/create-checkout-session/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                priceId: priceId,
                custId: custId
              })
            })
            .then(res => res.json());
  };

  return (
    <div className="App">
      <div className="AdminContent">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
          <h3>{myParams.cust}</h3>
          <h3>{myParams.channel}</h3>
          <button onClick={ () => {
              createCheckoutSession(myParams.channel, myParams.cust)
                .then(function(data) {
                // Call Stripe.js method to redirect to the new Checkout page
                stripe
                  .redirectToCheckout({
                    sessionId: data.sessionId
                  })
                  .then(handleResult);
              });
            }
          }>Please click to complete payment information</button>
      </div>
    </div>
  )
}
