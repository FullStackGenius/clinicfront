// import React from 'react';
// import './style.css';
// // import './custom_style.css';
// import ReactDOM from 'react-dom/client';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Provider } from 'react-redux';
// import App from './App';
// import { Toaster } from "react-hot-toast";
// import { store } from './redux/store';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// const stripePromise = loadStripe('pk_test_51RA80TKV1lSSoArcOW7JJniitp4RLGL3VaKRgrgrZzmjx6p2nIzm2B9FB0U7DtxegHfNCXiYJk56WkiDGCKpsHCL00nIGD25U5');
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
// 	<GoogleOAuthProvider clientId="313663891598-4bkv5u1re3f0p92190k8n2shpatbkcat.apps.googleusercontent.com">
// 		<React.StrictMode>
// 			<Toaster position="top-right" reverseOrder={false} />
// 			<Provider store={store}>
// 			<Elements stripe={stripePromise}>
// 				<App />
// 				</Elements>
// 			</Provider>
// 		</React.StrictMode>
// 	</GoogleOAuthProvider>
// );


import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
// import './custom_style.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import App from './App';
import { Toaster } from "react-hot-toast";
import { store } from './redux/store';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RA80TKV1lSSoArcOW7JJniitp4RLGL3VaKRgrgrZzmjx6p2nIzm2B9FB0U7DtxegHfNCXiYJk56WkiDGCKpsHCL00nIGD25U5');

const RootWrapper = () => {
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    stripePromise
      .then((loadedStripe) => {
        if (!loadedStripe) {
          console.error("Stripe.js failed to load. Check your internet connection.");
        }
        setStripe(loadedStripe);
      })
      .catch((err) => console.error("Error loading Stripe.js:", err));
  }, []);

  if (!stripe) {
    //return <div>Loading payment system...</div>; // fallback UI
  }

  return (
    <Elements stripe={stripe}>
      <App />
    </Elements>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId="313663891598-4bkv5u1re3f0p92190k8n2shpatbkcat.apps.googleusercontent.com">
    <React.StrictMode>
      <Toaster position="top-right" reverseOrder={false} />
      <Provider store={store}>
        <RootWrapper />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
