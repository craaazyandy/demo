import React, { useState, useEffect } from 'react'
import logo from './img/qplogo.png'
import './App.css'
import Table from 'react-bootstrap/Table'

export default function Channels() {
  // Show available channels and form to add new channels
  const [productName, setproductName] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [user, setUser] = useState('');
  const [prodList, setProdList] = useState([]);

  const SubIcon = () => {
    return (
      <span title="Subscribe">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm.354-7.646a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
        </svg>
      </span>
    )
  }

  useEffect(() => {
    refreshChannels();
  }, []);

  function clearFields() {
    setproductName('');
    setproductPrice('');
    setUser('');
  }

  function handleChange(event) {
    const n = event.target.name;
    if (n === 'name') setproductName(event.target.value);
    if (n === 'price') setproductPrice(event.target.value);
    if (n === 'user') setUser(event.target.value);
  }

  /**
   * 
   * add Channel
   */
  function addChannel(ownerAccount, ownerPhone) {
    console.log('creating product with name:' + productName + 'price:' + productPrice + 'acct:' + ownerAccount + 'phone:' + ownerPhone);

    // Set up product and pricing
    fetch("http://localhost:3000/prod", {
            method: 'post',
            body: 'name=' + productName + '&price=' + productPrice + '&user=' + ownerAccount + '&phone=' + ownerPhone,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(res => {
            console.log('Added a new channel');
            refreshChannels();
          })
          .catch(
            (error) => {
                alert("ERROR adding a new channel:" + error);
            }
          )
  }

  /**
   * 
   * refresh channels
   */
  function refreshChannels() {

    // get list of products (prices objects)
    fetch("http://localhost:3000/prods")
      .then(res => {
        res.json()
           .then(data => {
              var returnList = data.data;
              setProdList(returnList);
              clearFields();
           })
          .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }

  /**
   * 
   * For first time channel creator, also create connect account
   */
  function handleAdd(event) {
    event.preventDefault();

    if (!user.startsWith("acct_")) {

      // Set up new connect account
      fetch("http://localhost:3000/acct/" + user, {
        method: 'post',
      })
      .then(res => {
        res.json()
           .then(data => {
              alert('Please complete on boarding here: ' + data.link);
              addChannel(data.id, user)
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(
        (error) => {
            alert("ERROR creating new connect account" + error);
        }
      )
    }
    else {
      // TODO populate phone field by retrieving account
      addChannel(user, user)
    }
  }

  /**
   * 
   * handle subscription
   */
  function handleSubscribe(ch) {
    console.log('Ready to subscribe to:' + ch);
    const v = document.getElementById(ch).value;
    console.log('customer entered:' + v);

    if (!v.startsWith("cus_")) {
      // Set up new customer
      fetch("http://localhost:3000/cust/" + v, {
        method: 'post',
      })
      .then(res => {
        res.json()
           .then(data => {
              const subId = data.id;
              alert('Please complete your subscription here: http://localhost:3030/subscription/' + ch + '/' + subId);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(
        (error) => {
            alert("ERROR creating new connect account" + error);
        }
      )
    }
    else {
      alert('Please complete your subscription here: http://localhost:3030/subscription/' + ch + '/' + v);
    }
  }

  /**
   * 
   * list channels
   */
  const ListChannels = () => {
    
    if (prodList && prodList.length > 0) {

      return prodList.map((pd) => {
        const priceId = pd.id;
        const nm = pd.metadata.channel;
        const ur = pd.metadata.user;
        const ph = pd.metadata.phone;
        return (
          <tr key={priceId}>
            <td>{nm} ({pd.unit_amount}¢)</td>
            <td>{ur} {(ph.startsWith("acct_")) ? '' : '(' + ph + ')'}</td>
            <td>
              <label>
                  <input id={priceId} type="text" name="sub" size="10" maxLength="20" placeholder="customer"/>
              </label>
              <button onClick={() => handleSubscribe(priceId)}><SubIcon/></button>
            </td>
          </tr>
        )
      })
    }
    else {
      return (
        <tr>
          <td>No Channels</td>
          <td></td>
          <td></td>
      </tr>
      );
    }
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
                  <input type="text" name="user" value={user} placeholder="Phone or Acct #" onChange={handleChange}/>
              </label>
              <button type="submit">Add Channel</button>
          </form>
        </div>
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Channel Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <ListChannels/>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
