import React, { useState, useEffect  } from 'react'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceOpen, setInvoiceOpen] = useState([]);

  useEffect(() => {
    refreshInvoice();
  }, [])


  /**
   * 
   */
  function refreshInvoice() {
    // get list of invoices
    fetch("http://localhost:3000/invoices")
      .then(res => {
        res.json()
           .then(data => {
              setInvoiceList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListInvoices = () => {

    if (invoiceList && invoiceList.length > 0) {
      if (invoiceOpen.length < 1) {
        const aSize = invoiceList.length;
        let tAry = Array(aSize).fill(false);
        setInvoiceOpen(tAry);
      }

      return invoiceList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...invoiceOpen];
                tempAry[idx] = !tempAry[idx];
                setInvoiceOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={invoiceOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={invoiceOpen[idx]}>
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
      <ListInvoices/>
    </>
  )
}
