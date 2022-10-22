  import React, { useState, useEffect } from 'react';
  import {Elements} from 'react-stripe-elements';
  import InjectedCheckoutForm from './CheckoutForm.component.js';
  import axios from 'axios';





    const MyCheckOutTime = props => {

        const [name, setName] = useState("");
        const [quantity, setQuantity] = useState("");
        const [tally, setTally] = useState("");
        const [amount, setAmount] = useState("");
        const [cart, setCart] = useState([]);






      useEffect(
        () => {
      const here = { headers:
        {
        "this-token": localStorage.getItem("this-token")
      }
    }
      axios.get('/users/orders', here)
       .then(response => {
             setCart(response.data);
            let zazr = 0;
            for (let i = 0; i < cart.length; i++ ) {
              zazr += Number(cart[i].quantity);
            }
        setTally(zazr);

            })
            .then( res => {
              let theetot = [];
              theetot =  cart.map( cartU => {
                  const total = [];

                    const sum = cartU.price * cartU.quantity;
                    total.push(sum);
                    return total;

                  })
                  const sum1 = theetot.reduce((accumulator, currentValue) => {
                    return +accumulator + +currentValue;
                  }, [0]);
                  setAmount(sum1);
                  console.log(amount);
              })
           .catch((error) => {
             console.log(error);
           })
         },[tally]);












      return (
        <div>
         <Elements>
       <InjectedCheckoutForm amount={amount} adCart={cart}/>
       </Elements>
         </div>

  );



    }

    export default MyCheckOutTime;
