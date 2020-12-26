import React, { useState, useEffect  } from 'react'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [prodList, setProdList] = useState([]);
  const [prodOpen, setProdOpen] = useState([]);

  useEffect(() => {
    refreshProducts();
  }, [])


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


  return (
    <>
      <ListProducts/>
    </>
  )
}
