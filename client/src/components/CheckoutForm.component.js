import React, { useState, useEffect, useHistory, useBlocker } from 'react';
import { Prompt } from 'react-router-dom';
import axios from 'axios';
import CardSection from './CardSection.component';
import Modal from './modal.component';
import {injectStripe} from 'react-stripe-elements';






   const CheckoutForm = props => {



     const [name, setName] = useState("");
     const [mentionMan, setMentionMan] = useState("");
     const [commId, setCommId] = useState("");
     const [confirm, setConfirmMe] = useState(false);
     const [nono, setNono] = useState(["StripeCardError"]);
     let [isBlocking, setIsBlocking] = useState(false);
     const [openModal, setOpenModal] = useState(false);


     let barneyId = null;


   const confirmed = () => {

      const answer = {
        commId: barneyId,
        ready: "order received!"
      }

     axios.post('/users/confirmed', answer, { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
    })
    .then(res => {
      setOpenModal(false);
      setIsBlocking(false);
          deleteOrder();
       })
       .catch((error) => {
         console.log(error);
       })

     }


    const receiptMe = async () => {
    barneyId = Math.floor(Math.random() * 1001);

     const receipter = {
       yourOrder: props.adCart,
       amounter: props.amount,
       commId: barneyId
     }
     console.log(barneyId);

    await axios.post('/users/receiptme/', receipter, {  headers:
          {
            "this-token": localStorage.getItem("this-token")
           }
      })
   .then(res => console.log("You tried it..."));
   }


  const postOrder = async () => {
      const info = {
      adCart: props.adCart,
      commId: barneyId
    }
    await axios.post('/users/orders/info', info, {  headers:
          {
            "this-token": localStorage.getItem("this-token")
           }
      })
      .then(res => {
         console.log(info);
        })
        .catch((error) => {
          console.log(error);
        })
      }


      const deleteOrder = () => {

      axios.delete('/users/orders/all',  {  headers:
         {
            "this-token": localStorage.getItem("this-token")
           }
      })
      .then(response => {
       console.log("ok");
        window.location = "/status";
      })
      .catch((error) => {
        console.log(error);
      })
  }





    const handleInputChange = (event) => {
      event.preventDefault();
      setName(event.target.value);
  }


      const handleSubmit = async (ev) => {
        ev.preventDefault();
        ev.target.reset();
       // We don't want to let default form submission happen here, which would refresh the page.


      //Attempting to detect a user leaving

       try {
         let {
           token: { id },
         } = await props.stripe.createToken({ name: name });
         let amount = props.amount;
         setOpenModal(true);
         setIsBlocking(true);
         let res = await axios.post(
           '/users/pay',
           {
             token: id,
             amount,
           },
           {
             headers: {
               'this-token': localStorage.getItem('this-token'),
             },
           },
         );
         console.log(res.data);

       let eMan = nono.filter((el) => el === res.data);
      await (eMan.length > 0) ? console.log("Card did not go through.") : receiptMe();
       if (eMan.length > 0) {
         setMentionMan('There was an error with your card.');
       } else {
         postOrder();
         confirmed();
       }
     } catch (error) {
       console.log(error);
     }


   }






    return (

      <div>
      <Prompt when={isBlocking} message={"Are you sure you want to go?"}/>
    <input
     type="string"
     value={name}
     name="name"
     placeholder=" Card Name"
     onChange={handleInputChange}
     style={{
  border: "1px",
  borderTopStyle: "hidden",
  borderRightStyle: "hidden",
  borderLeftStyle:"hidden",
  borderBottomStyle: "groove",
  borderColor: "black",
  marginBottom: "2%"}} />
      <form onSubmit={handleSubmit}>
        <CardSection/>
        <button type="submit" value="Submit"
         className="btn btn-outline-primary" >
        Confirm order
        </button>
      </form>
      <h3>
      Total Amount:
      </h3>
      <p>
      ${props.amount}
      </p>
      <p>{mentionMan}</p>
      {openModal && <Modal closeModal={setOpenModal} />}
      </div>



    );
  }


export default injectStripe(CheckoutForm);
