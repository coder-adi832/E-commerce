import React, { useContext } from 'react';
import './CSS/Payment.css';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); 

const CheckoutForm = () => {
  const navigate = useNavigate()  
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalCartAmount, cartItems } = useContext(ShopContext);

  const shippingFee = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const amount = Math.round(getTotalCartAmount() * 100); 

    try {
      const res = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        alert('Payment could not be initiated.');
        return;
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert('Payment failed: ' + result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
            for (const key in cartItems) {
                cartItems[key] = 0;
            }
        navigate('/')
        alert('Payment successful!');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="payment-container">
      <h2>Order Summary</h2>
      <div className="payment-bill">
        <div className="bill-item">
          <p>Subtotal:</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>
        <div className="bill-item">
          <p>Shipping:</p>
          <p>₹{shippingFee}</p>
        </div>
        <div className="bill-item total">
          <h3>Total:</h3>
          <h3>₹{getTotalCartAmount() + shippingFee}</h3>
        </div>
      </div>

      <h2>Payment Details</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Details</label>
          <CardElement className="card-element" />
        </div>
        <button type="submit" className="payment-btn" disabled={!stripe}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
