import React, { useState, useEffect  } from 'react'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState([]);

  useEffect(() => {
    refreshPaymentMethods();
  }, [])


  /**
   * 
   */
  function refreshPaymentMethods() {
    /**
     * get list of payment methods
     * since payment methods are associated to customers,
     * retrieve customer list in order to build payment method list
     */
    fetch("http://localhost:3000/custs")
      .then(res => {
        res.json()
           .then(data => {
             data.data.map(thisCust => {
                const cid = thisCust.id;

                fetch("http://localhost:3000/payment_methods/" + cid)
                  .then(pmRes => {
                    pmRes.json()
                         .then(pmData => {
                            const resPmAry = pmData.data;
                            if (resPmAry.length > 0) {
                              setPaymentMethodList(items => [...items, ...resPmAry]);
                            }
                         })
                         .catch(err => console.log('error parsing payment methods json:' + err))
                  })
                  .catch(err => console.log('error reading payment methods:' + err))
             })
           })
           .catch(err => console.log('error parsing customers json:' + err))
      })
      .catch(err => console.log('error reading customers:' +err))
  }


  /**
   * 
   */
  const ListPaymentMethods = () => {

    if (paymentMethodList && paymentMethodList.length > 0) {
      if (paymentMethodOpen.length < 1) {
        const aSize = paymentMethodList.length;
        let tAry = Array(aSize).fill(false);
        setPaymentMethodOpen(tAry);
      }

      return paymentMethodList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...paymentMethodOpen];
                tempAry[idx] = !tempAry[idx];
                setPaymentMethodOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={paymentMethodOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={paymentMethodOpen[idx]}>
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
      <ListPaymentMethods/>
    </>
  )
}
