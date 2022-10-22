import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LilStat(props) {


return (


  <div
  style={{border: "solid", borderWidth: "2px", borderColor: "#A0B8C1",  borderRadius: "10px"}}
  className="shadow-sm p-2 mb-3 bg-white   card">
  <div className="card-body">
    <h3 style={{color: "#303030", fontWeight: "bold", fontSize: "27px", fontFamily: "Times Roman", letterSpacing: "1px"}}
    onClick={() => {props.displayOrder(props.status.ourId)}}>{props.status.ourId}</h3>
    <h2 style={{color: "#0047b3"}}>"{props.status.ready}"</h2>
    <h3 style={{fontSize: "2em"}} >{props.status.timeMan} min</h3>
      <h1 style={{fontSize: "1em"}} >{props.status.date}</h1>

    <div>

    <button type="button" value="button"  className="btn btn-success btn-sm"
    className="btn btn-outline-info btn-sm"
    style={{ marginLeft: "2%", marginRight:"1%", fontWeight: "bold"}}
     onClick={() => {props.tisGift(props.status.ourId)}}> a gift</button>

     <button type="button" value="button" className="btn btn-outline-danger btn-sm" style={{fontWeight: "bold",  color: "white", marginLeft: "6px"}}
     onClick={() => { props.deleteButton(props.status._id) }}> x </button>

     <div className={props.status.ourId}  style={{marginLeft: "1%", display: "none"}}>
<div style={{display: "inline-block"}}>
     <button type="button" value="button"  className="btn btn-secondary btn-sm"
     style={{color: "white", fontWeight: "bold"}}
      onClick={() => {props.sendGift(props.gifted, props.status.ourId)}}> send gift</button>
  </div>

  <div style={{display: "inline-block", marginTop: "2%"}}>
   <input
  className={props.status.key}
   style={{ width: "15em", fontWeight: "thin", borderColor: "#f9f9f9",
   borderRadius: "5px", marginTop: "2%", marginLeft: "4%"}}
    placeholder="    please type in a valid email"
    onChange={props.newGaft}
    type="text"
     />
     </div>


    </div>
    </div>

    </div>
    <div  className="mark"  style={{fontWeight: "bold", color: "grey", marginLeft: "4%", display: "none"}}>
     Oh no, we don't see that email? Please try another.
    </div>

  </div>

)}

function EditRun(props) {
return (

    <button type="button" style={{fontWeight: "bold"}} className="btn btn-outline-secondary"
    onClick={() => props.showDelete()}> Edit Account </button>


)}
function DeleteRun(props) {
return (
  <div>
  <button type="button" value="button" className="btn btn-outline-warning"  style={{fontWeight: "bold"}}
  onClick={() => { props.closeDelete()}}> Close Edit </button>
  <button type="button" value="button" className="btn btn-outline-danger" style={{fontWeight: "bold", marginLeft: ".3em"}}
   onClick={() => { props.accountDelete()}}> Delete Account </button>
  </div>


)}



  const StatLine = props => {

 const [showDelete, setShowDelete] = useState(false);
 const [giftedAction, setGifted] = useState("");
 const [showGiftAction, setShowGift] = useState('');
 const [statusCon, setStatusCon] = useState([]);
 const [checkEmail, setCheckEmail] = useState([]);
 const [truth, setTruth] = useState("begin");
 const [warnerBros, setWarner] = useState("Seems Fine");




   useEffect(
     () => {
      axios.get('/users/status', { headers:
        {
        "this-token": localStorage.getItem("this-token")
      }
      })
      .then(response => {
            setStatusCon(response.data);
   console.log(React.version);

          })
          .catch((error) => {
            console.log(error);
          })
        },[warnerBros, giftedAction]);

//final delete of profile
      const deleteButton = id => {
        axios.delete('/users/status/'+id, { headers:
          {
          "this-token": localStorage.getItem("this-token")
        }
        })
          .then(res => console.log(res.data));
          setStatusCon(statusCon.filter(el => el._id !== id));
      }

      useEffect(
        () => {
         axios.get('/users/checkEmail', { headers:
           {
           "this-token": localStorage.getItem("this-token")
         }
         })
         .then(response => {
               setCheckEmail(response.data);

             })
             .catch((error) => {
               console.log(error);
             })
           },[]);
//show delete profile button
      const showDeleteAction = () => {
          setShowDelete(true);
        }

        //gets user.email to check against user input



         // Unique duplicates


      /*const theSrt = (a, b) => {
       if (a.ourId > b.ourId) {
         return 1;
       } else if (b.ourId > a.ourId) {
         return -1;
       } else {
         return 0;
       }
     }*/

     //



  /*   const count = (newBox) => {

    newBox.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < newBox.length; i++) {
        if (newBox[i].ourId != current) {
            if (cnt > 0) {
                console.log(current + ' comes ' + cnt + ' times<br>');
            }
            current = newBox[i].ourId;
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        console.log(current + ' comes ' + cnt + ' times');
    }

} */

  const result = statusCon.reduce((groupedPeople, person) => {
      const age = person.ourId;
        if (groupedPeople[age] == null) groupedPeople[age] = [];
          groupedPeople[age].push(person);
          return groupedPeople;
        }, {});


     const uniqUsers = statusCon.reduce((map, obj) => map.set(obj.ourId, obj), new Map());
     const theDS = (a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
     }
      //display gift give button
      const showGiftButton = (entry) => {


       showGiftAction || '' ? setShowGift(false) : setShowGift(true);



             const giftId = statusCon.filter(el => el.ourId === entry);
             for (let i = 0; i < giftId.length; i++ ) {
               if (!showGiftAction) {
               let cool = document.getElementsByClassName(entry);
                 cool[i].style.display = "inline-block";

              } else {

                let cool = document.getElementsByClassName(entry);
                cool[i].style.display = "none";


                  setGifted('');

              }

              }



}

//there was an error in email gift
        const emailIssue = (iss) => {
          let box = []
          for (let i = 0; i < statusCon.length; ++i) {
            box.push(statusCon[i].ourId)
          }
        let ar = box.indexOf(iss);
        for (let i = 0; i < box.length; ++i) {
          let cool = document.getElementsByClassName("mark");
          cool[ar].style.display = "inline-block";
        }
        }


      //updateSend
        const statSend = async (our) => {


           const gifter = {
                ourIdMan: our,
                weReady: "successfully gifted"
              }

             await axios.put('/users/upStatsend', gifter, { headers:
               {
               "this-token": localStorage.getItem("this-token")
             }
             })
             .then(res => {
               window.location = "/status";
                })
                .catch((error) => {
                  console.log("big problem");
                })
      }

      const secPoint = async (our, him) => {

                const adUp = {
                   oldEmail: our,
                   newEmail: him,
                   adCart: statusCon
                 }

             await axios.put('/users/adminup', adUp, { headers:
                  {
                  "this-token": localStorage.getItem("this-token")
                }
                })
                .then(response => {
                   statSend(him);


                })
                .then(res => {
                  console.log("tumbleweed");
                   })
                   .then(res => {
                      //hide error message

                      })
                   .catch((error) => {
                     console.log(error);
                   })
                 }


                 const sendGift = async (him, our) => {
                  /* let b = our;
                   let c = b.indexOf(".com");
                   let d = b.substring(0, c !== -1 ? c : b.length);*/
                   let origOur = our;
                   let bb = him;
                   let cc = bb.indexOf("@");
                   let dd = bb.substring(0, cc !== -1 ? cc : bb.length);

                   const answer = {
                     commId: our,
                     email: him,
                     ready: `Hey ${dd}, you've been sent an order!`
                   }


                  await axios.post('/users/sendGift', answer, { headers:
                   {
                   "this-token": localStorage.getItem("this-token")
                 }
                 })
                 .then((res) => {
                      secPoint(him, origOur);
                      console.log(res.data);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                    setShowGift(our);
                      console.log(answer.commId);
                    }

            const updateAd = async (him, our) => {


              /*him = him.replace(/[^A-Za-z]+/g, '');*/
              const emailTruth = checkEmail.filter(el => el.email === him);
                await (emailTruth.length === 0) ? emailIssue(our) : sendGift(him, our);
                console.log(emailTruth.length);

                //show error message
}






  const giftedName = e => {

        const evalue = e.target.value;
        setGifted(evalue);
          }

      const closeDelete = () => {
        setShowDelete(false);
        }

  const accountDelete = async () => {
    const here = { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  }
  await axios.delete('/users/account', here)
    .then(response => {
          console.log("that's nice");
         })
        .catch((error) => {
          console.log(error);
        })
        axios.delete('/users/logout', here)
        .then(response => {
          const good = localStorage.clear('this-token');
            window.location = '/login';
        })
}


    const displayOrder = id => {
       window.location = '/displayOrder/'+id;
    }

    const ordersList = () => {

    let conStatus = [];
    let cargo = [];
    let load = [];
      for (const [key, value] of Object.entries(result)) {

      if (value.length > 1) {
         cargo.push(key);
      } else {
     conStatus.push(key)};
      }

        for (let i = 0; cargo.length > i; ++i) {
          let mean = cargo[i];
          load.push(result[mean].sort(theDS).shift());
          mean = null;
        }

        for (let i = 0; conStatus.length > i; ++i) {
          let nathan = conStatus[i];
          load.push(result[nathan].sort(theDS).shift());
          nathan = null;
        }

        load.sort(theDS);
    return load.map(sl=> {
         return <LilStat
         status={sl}
         displayOrder={displayOrder}
          deleteButton={deleteButton}
         tisGift={showGiftButton}
          gifted={giftedAction}
          sendGift={updateAd}
          showGift={showGiftAction}
          forGift={giftedAction}
         newGaft={giftedName}
         key={sl._id}/>;
      })
    }








    return (

      <div>
      { (showDelete === false) ?
    <EditRun showDelete={showDeleteAction}/>
      :
      <DeleteRun closeDelete={closeDelete} accountDelete={accountDelete}/>
    }

      <h2
      className="shadow-sm p-1 mb-4"
      style={{
        marginTop: "3%",
        fontFamily: "georgia",
        color: " grey",
        fontSize: "35px",
        letterSpacing: "2px",
        backgroundColor: "",
        textAlign: "center",
        border: "solid",
        borderWidth: "1px",
        borderRadius: "25px"

    }}>Profile</h2>
    <div className="shadow-sm p-2 mb-4 bg-white rounded"  ></div>
          <div>
          { ordersList() }
      </div>


        </div>


    )
  }
export default StatLine;
