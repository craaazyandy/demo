import React, { useState, useEffect } from 'react'
import logo from './img/qplogo.png'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  // Utility page to show StripeObjects
  const [acctList, setAcctList] = useState([]);
  const [acctOpen, setAcctOpen] = useState([]);
  console.log('1. test:' + acctOpen.length);

  useEffect(() => {
    refreshAccounts();
  }, [])


  function refreshAccounts() {
    // get list of connect accounts
    fetch("http://localhost:3000/accts")
      .then(res => {
        res.json()
           .then(data => {
              var returnList = data.data;
              setAcctList(returnList);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }

  const ListAccounts = () => {
    console.log('2. test:' + acctOpen.length);
    // const [open, setOpen] = useState(false);

    if (acctList && acctList.length > 0) {
      if (acctOpen.length < 1) {
        const aSize = acctList.length;
        let tAry = Array(aSize).fill(false);
        setAcctOpen(tAry);
      }

      return acctList.map((data, idx) => {
        const ph = data.metadata.phone;
        console.log('3. test:' + acctOpen.length);

        return (
          <li key={ph}>
            <Button
              onClick={() => {
                let tempAry = [...acctOpen];
                tempAry[idx] = !tempAry[idx];
                setAcctOpen(tempAry);
              }}
              // onClick={() => setOpen(!open)}
              aria-controls={ph}
              aria-expanded={acctOpen[idx]}
            >{ph}</Button>
            <Collapse in={acctOpen[idx]}>
              <div id={ph} style={{borderStyle:'solid'}}><div><pre>{JSON.stringify(data, null, 2) }</pre></div></div>
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
