import React, { useState } from 'react'
import logo from './img/qplogo.png'
import './App.css'

export default function Channels() {
  // Show available channels and form to add new channels
  const [productName, setproductName] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [user, setUser] = useState('');

  function reload() {
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
   * For first time channel creator, also create connect account
   */
  function handleAdd(event) {
    event.preventDefault();

    const acct = '';
    const phone = '';

    if (!user.startsWith("acct_")) {

      // Set up new connect account
      fetch("http://localhost:3000/acct", {
        method: 'post',
        body: 'name=' + productName + '&price=' + productPrice + '&user=' + acct + '&phone=' + phone,
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

    console.log('new channel');

    fetch("http://localhost:3000/prod", {
            method: 'post',
            body: 'name=' + productName + '&price=' + productPrice + '&user=' + acct + '&phone=' + phone,
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
    fetch("http://localhost:3000/prods")
    .then(res => {
      console.log('response status:' + res.status);
      res.json()
         .then(data => console.log('got it:' + JSON.stringify(data)))
         .catch(err => console.log('json() error:' + err))
    })
    .catch(err => console.log('res error:' +err))

    
    // .then(res => {
    //   console.log('listing channels response:' + res.json());
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
    // })
    // .catch(
    //   (error) => {
    //       alert("ERROR listing channels:" + error);
    //       return (
    //         <h3>ERROR!</h3>
    //       )
    //   }
    // )
    return(
      <div>happy</div>
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
                  <input type="text" name="user" value={user} placeholder="Phone or Acct #" onChange={handleChange}/>
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
