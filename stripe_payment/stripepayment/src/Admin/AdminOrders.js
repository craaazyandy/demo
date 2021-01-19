import React, { useState, useEffect  } from 'react'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [orderList, setOrderList] = useState([]);
  const [orderOpen, setOrderOpen] = useState([]);

  useEffect(() => {
    refreshOrders();
  }, [])


  /**
   * 
   */
  function refreshOrders() {
    // get list of orders
    fetch("http://localhost:3000/orders")
      .then(res => {
        res.json()
           .then(data => {
              setOrderList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListOrders = () => {

    if (orderList && orderList.length > 0) {
      if (orderOpen.length < 1) {
        const aSize = orderList.length;
        let tAry = Array(aSize).fill(false);
        setOrderOpen(tAry);
      }

      return orderList.map((data, idx) => {
        const id = data.id;
        const em = data.email;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...orderOpen];
                tempAry[idx] = !tempAry[idx];
                setOrderOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={orderOpen[idx]}
            >{id} ({em})</Button>
            <Collapse in={orderOpen[idx]}>
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
      <ListOrders/>
    </>
  )
}
