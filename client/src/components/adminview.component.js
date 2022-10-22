import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TickView from './tickView.component';
import axios from 'axios';
import '../media.css';


/*<iframe width="560" height="315" src="https://www.youtube.com/embed/JvJ0D2WTz9w"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>*/


  function Amino(props) {
  return (
    <div style={{ boxShadow: "3px 3px 3px 3px silver", marginTop: "1%", border: "solid 2px"}}
    className="shadow-md p-2 mb-3 bg-white   card">

  <p style={{color: "red", fontSize: "20px", marginTop: "0px", marginBottom: "0px", marginLeft: "2%" }}
   className={props.orders.ourId} onClick={() => { props.tickView(props.orders.ourId) }}>{props.orders.ourId}</p>
   <div className="shadow-sm p-2 mb-2 bg-white rounded"  ></div>
  <p style={{fontSize: "25px", margin: "0px", marginLeft: "2%"}} className={props.orders.title}
  onClick={() => { props.tickView(props.orders.ourId) }}>{props.orders.title}</p>

  <h2 style={{fontSize: "13px",fontWeight: "bold", margin: "0px", marginLeft: "2%"}} className={props.orders.date}
  >{props.orders.date}</h2>



      <p  style={{marginTop: "0px", marginBottom: "0px", marginLeft: "2%" }}
      onClick={() => { props.tickView(props.orders.ourId) }} >{props.orders.notes}</p>

      <p  style={{color: "red", fontSize: "18", fontWeight: "bold", marginBottom: "0px", marginLeft: "2%" }}
      onClick={() => { props.tickView(props.orders.ourId) }} >({props.orders.quantity})</p>

     <div className= "allbuttons" >
      <button type="button" value="button" className="btn" style={{fontWeight: "bold"}}
      onClick={() => { props.readyButton(props.orders.ourId) }}>  ready</button>


      <button type="button" value="button" className="btn"  style={{ fontWeight: "bold"}}
        onClick={() => { props.highlightKey(props.orders.ourId)}}>  key</button>



      <button type="button" value="button"  className="btn" style={{fontWeight: "bold"}}
       onClick={() => { props.highlightTitle(props.orders.title)}}>  item</button>


       <button type="button" value="button"  className="btn" style={{color: "black", fontWeight: "bold"}}
        onClick={() => { props.timeMan(props.orders.ourId)}}> time </button>


      <input
          className="ten"
          //value={props.timerMan}
          onChange={props.onChangeMan}
          type="number"
        />



  </div>

  <button  type="button" value="button" className="shadow-sm border-1  bg-white delete "
  style={{  fontWeight: "bold", borderRadius: "25px"}}
  onClick={() => { props.deleteMenu(props.orders._id, props.orders.ourId) }}> delete </button>
      </div>

  )}


      const MenuItems = props => {



                const [orders, setOrderS] = useState([]);
                const [adminoV, setAdminoV] = useState('');
                const [adminoT, setAdminoT] = useState('');
                const [ready, setReady] = useState('');
                const [key, setKey] = useState('');
                const [man, setTimeMan] = useState('');
                const [email, setEmail] = useState('');
                const [trueT, setTrueT] = useState(true);
                const [truth, setTruth] = useState(true);
                const [eyeDee, setEyeDee] = useState('');
                const [statusCon, setStatusCon] = useState([]);




       useEffect(
                  () => {
      axios.get('/users/amino', { headers:
        {
        "this-token": localStorage.getItem("this-token")
      }
      })
      .then(response => {
            setOrderS(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
        },[]);

      const mist = () => {


          const result = orders.reduce((groupedPeople, person) => {
              const id = person.ourId;
                if (groupedPeople[id] == null) groupedPeople[id] = [];
                  groupedPeople[id].push(person);
                  return groupedPeople;
                }, {});

                return Object.keys(result).length


                console.log("NavV Greene");


         }

      const tickView = (_id) => {
       window.location = '/tickView/'+_id;

      }


      const onChangeMan = (e) => {
        setTimeMan(e.target.value);
        console.log(man);
      }

      //Send ticket as part of delete process
        const ticketSend = async (our) => {
        let tick = orders.filter(el => el.ourId === our)
        let bigTicker = [];
        for (let i = 0; i < tick.length; ++i) {

        let ticket = {
          ourId: our,
          title: tick[i].title,
          notes: tick[i].notes,
          quantity: tick[i].quantity,
          price: tick[i].price
        }


        console.log(bigTicker);
        await axios.post('/users/ticketFinder/', ticket, { headers:
          {
          "this-token": localStorage.getItem("this-token")
        }
        })
        .then(res => {
          console.log("Go nuts");
        })
        .catch(err => {
          console.log("ticket did not get posted");
        })
}
      }

      const deleteMenu = (id, our) => {
          console.log(id);
         axios.delete('/users/damino/'+id, { headers:
            {
            "this-token": localStorage.getItem("this-token")
          }
          })
            .then(res => {
           ticketSend(our);
            })
            .then(response => {
              setOrderS(orders.filter(el => el._id !== id))
          })
            .catch((error) => {
              console.log(id);
            })

          }


      const onReady = (id) => {
        let an = orders.filter(el => el.ourId === id)
        let f = an.map(a => {
      let b = a.ourId;
      let c = b.indexOf(".com");
      let d = b.substring(0, c !== -1 ? c : b.length);
      b = d.concat(".com");
      return b;
    })
    let email = f[0];
    let ready = "Ready!";

        setStatusCon(an);
        const answer = {
          email: email,
          ourId: id,
          ready: ready
        }

      axios.post('/users/status', answer, { headers:
        {
        "this-token": localStorage.getItem("this-token")
      }
      })
      .then(res => {
         console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })

      }

              const comeIn = (id) => {
                  let an = this.state.orders.filter(el => el.ourId === id)
                  let f = an.map(a => {
                  let b = a.ourId;
                  let c = b.indexOf(".com");
                  let d = b.substring(0, c !== -1 ? c : b.length);
                  b = d.concat(".com");
                  return b;
              })

              let email = f[0];
              let ready = "Come-In!";
              setStatusCon(an);

              const answer = {
              email: email,
              ourId: id,
              ready: ready
              }

              axios.post('/users/status', answer, { headers:
              {
              "this-token": localStorage.getItem("this-token")
              }
              })
              .then(res => {
              console.log(res.data);
              })
              .catch((error) => {
              console.log(error);
              })

              }

    const timeMan = (id) => {
      let an = orders.filter(el => el.ourId === id)
      let f = an.map(a => {
    let b = a.ourId;
    let c = b.indexOf(".com");
    let d = b.substring(0, c !== -1 ? c : b.length);
    b = d.concat(".com");
    return b;
   })
   let email = f[0];


   const orderTime = {
    email: email,
    ourId: id,
    ready: "Coming Up!",
    timeMan: man
   }

    axios.post('/users/status', orderTime, { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
    })
    .then(res => {
       console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }



    const recycler = () => {
      window.location = "/ticketstore"
    }



    const highlightTitle = (entry) => {
  if (trueT) {
    setTrueT(false);
  } else {
    setTrueT(true);
  }

  const adminV = orders.filter(el => el.title === entry);
  let newT = null;
  for (let i = 0; i < adminV.length; i++ ) {
    if (trueT) {
     let cool = document.getElementsByClassName(adminV[i].title);
     cool[i].style.backgroundColor = "pink";
    cool[i].style.borderColor = "blue";
    cool[i].style.color = "black";
    cool[i].style.fontWeight = "900";
    newT += Number(adminV[i].quantity);
   } else {
     let cool = document.getElementsByClassName(adminV[i].title);
     cool[i].style.backgroundColor = "";
     cool[i].style.borderColor = "";
       cool[i].style.color = "black";
     cool[i].style.fontWeight = "";
     newT = null;
   }

   }
   setAdminoT(newT);
   console.log(newT);
}



 const highlightKey = (entry, id) => {
  if (truth) {
    setTruth(false);
  } else {
    setTruth(true);
  }

  let adminV = orders.filter(el => el.ourId === entry);
  let newQuat = null;
      for ( let i = 0; i < adminV.length; i++) {
      if (truth) {
       let cool = document.getElementsByClassName(adminV[i].ourId);
       cool[i].style.backgroundColor = "lightgrey";
      cool[i].style.borderColor = "green";
      cool[i].style.color = "black";
      cool[i].style.fontWeight = "900";
      newQuat += Number(adminV[i].quantity);
     } else {
       let cool = document.getElementsByClassName(adminV[i].ourId);
       cool[i].style.backgroundColor = "";
       cool[i].style.borderColor = "";
       cool[i].style.color = "red";
       cool[i].style.fontWeight = "";
     }
  }
  setAdminoV(newQuat);
  console.log(adminoV);


}




  const ordersList = () => {
      const theDS = (a, b) => {
         return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      }

      let open = orders;
      mist();

      open.sort(theDS);
      return open.map(currentOrders => {
        console.log(currentOrders.date);
        return <Amino
        orders={currentOrders}
        deleteMenu={deleteMenu}
        highlightTitle={highlightTitle}
        highlightKey={highlightKey}
        timeMan={timeMan}
        timerMan={man}
        onChangeMan={onChangeMan}
        readyButton={onReady}
        comeInButton={comeIn}
        tickView={tickView}
        key={currentOrders._id}/>;
      })
    }






        let showButton = '';
        (trueT) ? showButton = "none" : showButton = "";
    return (
      <div>
      { (truth === true) ? <h3>Open Orders<span className="float-right">all day ticket: <span style={{color: "red"}}>
         {mist()}</span></span></h3>:
         <h3>Open Orders<span className="float-right">all day: <span style={{color: "red"}}>
            {adminoV}</span></span></h3>}
            <h3> <span className="float-right" style={{display: showButton}} >all day item: <span style={{color: "red"}}>
               {adminoT}</span></span></h3>

              <button
              className="btn btn-success btn-sm"
              style={{
              marginLeft: "2%",
              marginBottom: "1%",
              letterSpacing: "1px",
              fontFamily: "georgia"
                     }}
              onClick={() => {recycler()}}

            >
             *Recycle
              </button>
                <div className="shadow p-1 mb-4 mt-2" ></div>
            <div className="theBod">
              { ordersList() }
            </div>



        </div>


    )
  }

export default MenuItems;
