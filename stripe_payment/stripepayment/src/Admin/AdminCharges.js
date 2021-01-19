import React, { useState, useEffect  } from 'react'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [chargeList, setChargeList] = useState([]);
  const [chargeOpen, setChargeOpen] = useState([]);

  useEffect(() => {
    refreshCharges();
  }, [])


  /**
   * 
   */
  function refreshCharges() {
    // get list of charges
    fetch("http://localhost:3000/charges")
      .then(res => {
        res.json()
           .then(data => {
              setChargeList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListCharges = () => {

    if (chargeList && chargeList.length > 0) {
      if (chargeOpen.length < 1) {
        const aSize = chargeList.length;
        let tAry = Array(aSize).fill(false);
        setChargeOpen(tAry);
      }

      return chargeList.map((data, idx) => {
        const id = data.id;
        const pm = data.payment_method;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...chargeOpen];
                tempAry[idx] = !tempAry[idx];
                setChargeOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={chargeOpen[idx]}
            >{id} ({pm})</Button>
            <Collapse in={chargeOpen[idx]}>
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
      <ListCharges/>
    </>
  )
}
