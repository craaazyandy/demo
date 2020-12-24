import React, { useState, useEffect  } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [piList, setPiList] = useState([]);
  const [piOpen, setPiOpen] = useState([]);

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
              setPiList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListPaymentIntents = () => {

    if (piList && piList.length > 0) {
      if (piOpen.length < 1) {
        const aSize = piList.length;
        let tAry = Array(aSize).fill(false);
        setPiOpen(tAry);
      }

      return piList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...piOpen];
                tempAry[idx] = !tempAry[idx];
                setPiOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={piOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={piOpen[idx]}>
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
