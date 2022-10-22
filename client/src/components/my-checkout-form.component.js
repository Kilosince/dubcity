import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



function CartView(props) {
      return (
        props.cart.map(cart =>

            <div className="card" key={cart._id} style={{ marginBottom: "10px", borderColor: "#A0B8C1"}}>
            <div className="card-body">


                <h4 className="card-title">{cart.title}</h4>
                <p className="card-text">{cart.description}</p>
                <p className="card-text">{cart.notes}</p>
                <h5 className="card-text"><small>price: </small>${cart.price}</h5>
                <span className="card-text">
                  <small>Quantity: </small>{cart.quantity}
                </span>






             </div>
             <button className="btn btn-sm btn-outline float-right" style={{
               fontWeight: "bold",
               borderRadius: "0px",
               borderRight: "none",
               borderLeft: "none",
               borderColor: "#A0B8C1",
               color: "grey"

             }}
                onClick={() => {
                  props.deleteHere(
                    cart._id,
                    cart.title,
                    cart.imagePath,
                    cart.description, cart.price, cart.quantity, cart.date, cart.ourId)}}
                  >Delete From Cart</button>
           </div>


    ))}


export default class MyCheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.deleteHere = this.deleteHere.bind(this);
    this.qtyUpdate = this.qtyUpdate.bind(this);
    this.cB = this.cB.bind(this);





      this.state = {
          info: [],
          cart: []
      }
  }
  componentDidMount() {
    const here = { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  }
     axios.get('/users/orders', here)
     .then(response => {
           this.setState({ cart: response.data })
          })
         .catch((error) => {
           console.log(error);
         })

     }


          componentDidUpdate() {
          let theetot = [];
          theetot =  this.state.cart.map( cartU => {
              const total = [];

                const sum = cartU.price * cartU.quantity;
                total.push(sum);
                return total;

              })
              if (theetot > 0) {
              const sum1 = theetot.reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
              });
                console.log(sum1);
              } else {
                const sum1 = "There is nothing in the Cart";
                console.log(sum1);
              }
          }


            cB(ourId, imagePath, title, description, price, qty, date){
              let j = this.state.info.available_quantity + +qty;
              let dpr = new Date();
              let dateUs = dpr.toDateString();
              let dateMe = dpr.toLocaleTimeString('en-US', {  hour: "numeric", minute: "numeric"});
              const menuQuat = {
              id: ourId,
              imagePath: imagePath,
              title: title,
              description: description,
              price: price,
              available_quantity: j,
              date: dateUs + ' ' +  dateMe
            }

            axios.put('/menu/update/quant', menuQuat, { headers:
              {
              "this-token": localStorage.getItem("this-token")
            }
          })
          .then(res => console.log(menuQuat));
            }


          qtyUpdate(ourId, title, imagePath, description, price, qty, date){
            axios.get('/menu/'+ourId, { headers:
              {
              "this-token": localStorage.getItem("this-token")
            }
          })
            .then(res => {
                this.setState({ info: res.data })
              this.cB(ourId, imagePath, title, description, price, qty, date);


          })


        }


          deleteHere(id, title, imagePath, description, price, qty, date, ourId) {
            let box = this.state.cart.filter(el => el.title === title);
            axios.delete('/users/orders/'+id, { headers:
              {
              "this-token": localStorage.getItem("this-token")
            }
          })
            .then(res => console.log(res.data));
              this.setState({ cart: this.state.cart.filter(el => el._id !== id)
            })
          this.qtyUpdate(ourId, title, imagePath, description, price, qty, date);

}






  render() {

    return (
      this.state.cart.length > 0 ?<div>
      <h2
      className="shadow-sm p-1 mb-4"
      style={{
        marginTop: "3%",
        fontFamily: "Staatliches",
        fontSize: "35px",
        color:  "grey",
        textAlign: "center",
        border: "solid",
        borderWidth: "thin",
        borderRadius: "10px",


    }}><span style={{
      color: "black"

  }}>Cart</span></h2>
      <div className="shadow-sm p-1 mb-4" style={{border: "solid", borderColor: "#E1EAF5", borderWidth: "thin"}} ></div>
        <CartView cart={this.state.cart}  deleteHere={this.deleteHere}/>
        <Link to="/finalout">
          <button className="btn btn-md float-right" style={{
            fontWeight: "bold",
            backgroundColor: "#70A7ED",
            color: "white"}}>Checkout</button>
        </Link>

        </div>
       :
        <div style={{ textAlign:"center"}}><br></br><h2>Cart is Empty </h2></div>

);
}
}
