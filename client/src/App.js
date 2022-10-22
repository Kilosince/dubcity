    import React from 'react';
    import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link,
      useHistory,
      usePrompt,
      useBlocker,
      Routes
    } from "react-router-dom";
    import "bootstrap/dist/css/bootstrap.min.css"

    import {StripeProvider} from 'react-stripe-elements';


    import Navbar from "./components/navbar.component";
    import WeatherMan from "./components/weatherman.component";
    import MenuItems from "./components/ad-menu-items.component";
    import Modal from "./components/modal.component";
    import TickView from "./components/tickView.component";
    import RestoreItems from "./components/restoreItem.component";
    import TicketStore from "./components/ticketStore.component";
    import UserItems from "./components/us-menu.list.component";
    import ShowMe from "./components/disOrder.component";
    import UserBank from "./components/user.bank.component";
    import OrdersBank from "./components/adminview.component";
    import EditItem from "./components/edit-items.component";
    import CreateItem from "./components/create-menu-items.component";
    import CreateUser from "./components/create-user.component";
    import Login from "./components/login.component";
    import Footer from "./components/footer.component";

    import StatLine from "./components/statLine.component";
    import Checkout from "./components/my-checkout-form.component";
    import MyCheckOutTime from "./components/checkouttime.component";

    //const url = `https://api.openweathermap.org/data/2.5/weather?q=portland&appid=de972e4c2eb6a9fbe69412995d65170d`;
    function App() {
      return (
        <Router>
        <div className="container">
          <Navbar />
          <WeatherMan/>
        <br />
        <Route path="/" exact component={UserItems} />
        <Route path="/menuitem" component={MenuItems} />
        <Route path="/modal" component={Modal} />
        <Route path="/tickView/:id" component={TickView} />
        <Route path="/users"  component={UserBank} />
        <Route path="/amino"  component={OrdersBank} />
        <Route path="/damino/:id" component={MenuItems} />
        <Route path="/restore"  component={RestoreItems} />
        <Route path="/displayOrder/:id"  component={ShowMe} />
        <Route path="/ticketStore"  component={TicketStore} />
        <Route path="/edit/:id" component={EditItem} />
        <Route path="/create" component={CreateItem} />
        <Route path="/user" component={CreateUser} />
        <Route path="/login" component={Login} />


        <Route path="/status" component={StatLine} />
        <Route path="/checkout" component={Checkout} />



        <StripeProvider apiKey="pk_test_gHRNbIXqJnr5ead25WqdZ4uX" >
        <Route path="/finalout" component={MyCheckOutTime} />
        </StripeProvider>
        </div>

        <Footer />
        </Router>

      );
    }

      export default App;
