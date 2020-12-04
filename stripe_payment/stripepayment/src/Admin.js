import React, { useState, useEffect } from 'react'
import logo from './img/qplogo.png'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  // Utility page to show StripeObjects
  const [acctList, setAcctList] = useState([]);
  const [acctOpen, setAcctOpen] = useState([]);
  const [custList, setCustList] = useState([]);
  const [custOpen, setCustOpen] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [prodOpen, setProdOpen] = useState([]);
  const [subsList, setSubsList] = useState([]);
  const [subsOpen, setSubsOpen] = useState([]);

  useEffect(() => {
    refreshAccounts();
    refreshCustomers();
    refreshProducts();
    refreshSubscriptions();
  }, [])


  /**
   * 
   */
  function refreshAccounts() {
    // get list of connect accounts
    fetch("http://localhost:3000/accts")
      .then(res => {
        res.json()
           .then(data => {
              setAcctList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }

  /**
   * 
   */
  function refreshCustomers() {
    // get list of customers
    fetch("http://localhost:3000/custs")
      .then(res => {
        res.json()
           .then(data => {
              setCustList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }

  /**
   * 
   */
  function refreshProducts() {
    // get list of products
    fetch("http://localhost:3000/prods")
      .then(res => {
        res.json()
           .then(data => {
              setProdList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }

  /**
   * 
   */
  function refreshSubscriptions() {
    // get list of subscriptions
    fetch("http://localhost:3000/subs")
      .then(res => {
        res.json()
           .then(data => {
              setSubsList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }

  /**
   * 
   */
  const ListAccounts = () => {

    if (acctList && acctList.length > 0) {
      if (acctOpen.length < 1) {
        const aSize = acctList.length;
        let tAry = Array(aSize).fill(false);
        setAcctOpen(tAry);
      }

      return acctList.map((data, idx) => {
        const id = data.id;
        const ph = data.metadata.phone;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...acctOpen];
                tempAry[idx] = !tempAry[idx];
                setAcctOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={acctOpen[idx]}
            >{id} ({ph})</Button>
            <Collapse in={acctOpen[idx]}>
              <div id={id} style={{borderStyle:'solid'}}><div><pre>{JSON.stringify(data, null, 2) }</pre></div></div>
            </Collapse>
          </li>
        )
      })
    }
    else {
      return (
        <li></li>
      );
    }
  }

  /**
   * 
   */
  const ListCustomers = () => {

    if (custList && custList.length > 0) {
      if (custOpen.length < 1) {
        const aSize = custList.length;
        let tAry = Array(aSize).fill(false);
        setCustOpen(tAry);
      }

      return custList.map((data, idx) => {
        const id = data.id;
        const ph = data.phone;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...custOpen];
                tempAry[idx] = !tempAry[idx];
                setCustOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={custOpen[idx]}
            >{id} ({ph})</Button>
            <Collapse in={custOpen[idx]}>
              <div id={id} style={{borderStyle:'solid'}}><div><pre>{JSON.stringify(data, null, 2) }</pre></div></div>
            </Collapse>
          </li>
        )
      })
    }
    else {
      return (
        <li></li>
      );
    }
  }

  /**
   * 
   */
  const ListProducts = () => {

    if (prodList && prodList.length > 0) {
      if (prodOpen.length < 1) {
        const aSize = prodList.length;
        let tAry = Array(aSize).fill(false);
        setProdOpen(tAry);
      }

      return prodList.map((data, idx) => {
        const id = data.id;
        const ch = data.metadata.channel;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...prodOpen];
                tempAry[idx] = !tempAry[idx];
                setProdOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={prodOpen[idx]}
            >{id} ({ch})</Button>
            <Collapse in={prodOpen[idx]}>
              <div id={id} style={{borderStyle:'solid'}}><div><pre>{JSON.stringify(data, null, 2) }</pre></div></div>
            </Collapse>
          </li>
        )
      })
    }
    else {
      return (
        <li></li>
      );
    }
  }

  /**
   * 
   */
  const ListSubscriptions = () => {

    if (subsList && subsList.length > 0) {
      if (subsOpen.length < 1) {
        const aSize = subsList.length;
        let tAry = Array(aSize).fill(false);
        setSubsOpen(tAry);
      }

      return subsList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...subsOpen];
                tempAry[idx] = !tempAry[idx];
                setSubsOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={subsOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={subsOpen[idx]}>
              <div id={id} style={{borderStyle:'solid'}}><div><pre>{JSON.stringify(data, null, 2) }</pre></div></div>
            </Collapse>
          </li>
        )
      })
    }
    else {
      return (
        <li></li>
      );
    }
  }

  return (
    <div className="App">
      <div className="AdminContent">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <div className="AdminItem">
          <div>
            <h4>Connected Accounts</h4>
            <ul>
              <ListAccounts/>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <ListProducts/>
            </ul>
          </div>
          <div>
            <h4>Customers</h4>
            <ul>
              <ListCustomers/>
            </ul>
          </div>
          <div>
            <h4>Subscriptions</h4>
            <ul>
              <ListSubscriptions/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
