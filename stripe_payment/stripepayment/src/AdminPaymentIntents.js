import React, { useState, useEffect  } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [paymentIntentList, setPaymentIntentList] = useState([]);
  const [paymentIntentOpen, setPaymentIntentOpen] = useState([]);

  useEffect(() => {
    refreshPaymentIntents();
  }, [])


  /**
   * 
   */
  function refreshPaymentIntents() {
    // get list of payment intents
    fetch("http://localhost:3000/payment_intents")
      .then(res => {
        res.json()
           .then(data => {
              setPaymentIntentList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListPaymentIntents = () => {

    if (paymentIntentList && paymentIntentList.length > 0) {
      if (paymentIntentOpen.length < 1) {
        const aSize = paymentIntentList.length;
        let tAry = Array(aSize).fill(false);
        setPaymentIntentOpen(tAry);
      }

      return paymentIntentList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...paymentIntentOpen];
                tempAry[idx] = !tempAry[idx];
                setPaymentIntentOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={paymentIntentOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={paymentIntentOpen[idx]}>
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
      <ListPaymentIntents/>
    </>
  )
}
