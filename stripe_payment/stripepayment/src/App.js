import React, { useState } from 'react'
import logo from './img/qplogo.png'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const Landing = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Hello World</h3>
      </div>
    </div>
  )
}

const Refresh = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Link expired.  Please refresh your access link</h3>
      </div>
    </div>
  )
}

const Complete = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Thank you!</h3>
        <p>You have completed your on boarding process</p>
        <p>Welcome to QP !!!</p>
      </div>
    </div>
  )
}

const Admin = () => {

  var stripe = window.Stripe('pk_test_51Hh4PTExKtPKw5yvleHfMcKOFOKLyf0AhX8KEeATqqjKaFE2d5dnGjEr8GlGGaVjRYEaQ0sBdIF0pU9wLBBPBYXQ00LtoX2Pbh');

  return (
    <div className="App">
      <div className="AdminContent">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <div className="AdminItem">
          <div>
            <h4>Connected Accounts</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Customers</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Subscriptions</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Account Balance</h4>
            <p>$123.45</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Channels = () => {
  // Show available channels and form to add new channels
  const [productName, setproductName] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [phone, setPhone] = useState('');

  function reload() {
    setproductName('');
    setproductPrice('');
    setPhone('');
  }

  function handleChange(event) {
    const n = event.target.name;
    if (n === 'name') setproductName(event.target.value);
    if (n === 'price') setproductPrice(event.target.value);
    if (n === 'phone') setPhone(event.target.value);
  }

  function handleAdd(event) {
    event.preventDefault();

    fetch("http://localhost:3000/prod", {
            method: 'post',
            mode: 'no-cors',
            body: 'name=' + productName + '&price=' + productPrice + '&user=' + phone,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(res => {
            console.log('Added a new channel' + res);
            reload();
          })
          .catch(
            (error) => {
                alert("ERROR adding a new channel:" + error);
                reload();
            }
          )
  }

  const ListChannels = () => {
    fetch("http://localhost:3000/prods", {
      method: 'get',
      mode: 'no-cors'
    })
    .then(res => {
      console.log('listing channels 1' + res);
      // res.data.map((pd) => {
      //   const nm = pd.metadata.channel;
      //   console.log('nm' + nm);
      //   const pc = pd.unit_amount;
      //   console.log('pc' + pc);
      //   const ur = pd.metadata.user;
      //   console.log('ur' + ur);
      //   return (
      //       <div>
      //           <div style={{float:'left'}}>Channel Name: {nm}</div>
      //           <div style={{float:'left'}}>Price: {pc} cents</div>
      //           <div style={{float:'left'}}>Owner: {ur}</div>
      //       </div>
      //   )
      // })
    })
    .catch(
      (error) => {
          alert("ERROR listing channels:" + error);
          return (
            <h3>ERROR!</h3>
          )
      }
    )
  }

  return (
    <div className="App">
      <div className="AdminContent">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <div style={{padding : '20px'}}>
          <form key="random4" onSubmit={handleAdd}>
              <label>
                  <input type="text" name="name" value={productName} placeholder="Product Name" onChange={handleChange}/>
              </label>
              <label style={{paddingLeft : '30px'}}>
                  <input type="text" name="price" value={productPrice} placeholder="Price" onChange={handleChange}/>
              </label>
              <label style={{paddingLeft : '30px'}}>
                  <input type="text" name="phone" value={phone} placeholder="Phone" onChange={handleChange}/>
              </label>
              <button type="submit">Add Channel</button>
          </form>
        </div>
        <div>
          <ListChannels/>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/refresh">
            <Refresh/>
        </Route>
        <Route exact path="/complete">
            <Complete/>
        </Route>
        <Route exact path="/admin">
            <Admin/>
        </Route>
        <Route exact path="/channels">
            <Channels/>
        </Route>
        <Route><Landing/></Route>
      </Switch>
    </Router>
  );
}

export default App;
