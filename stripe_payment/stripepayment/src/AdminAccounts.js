import React, { useState, useEffect  } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  // Utility page to show StripeObjects
  const [acctList, setAcctList] = useState([]);
  const [acctOpen, setAcctOpen] = useState([]);

  useEffect(() => {
    refreshAccounts();
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


  return (
            <>
              <ListAccounts/>
            </>
  )
}
