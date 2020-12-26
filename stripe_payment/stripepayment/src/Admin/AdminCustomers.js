import React, { useState, useEffect } from 'react'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Customers() {
  // Utility page to show StripeObjects
  const [custList, setCustList] = useState([]);
  const [custOpen, setCustOpen] = useState([]);

  useEffect(() => {
    refreshCustomers();
  }, [])


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

  
  return (
    <>
      <ListCustomers/>
    </>
  )
}