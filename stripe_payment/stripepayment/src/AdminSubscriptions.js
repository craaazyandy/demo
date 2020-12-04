import React, { useState, useEffect  } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [subsList, setSubsList] = useState([]);
  const [subsOpen, setSubsOpen] = useState([]);

  useEffect(() => {
    refreshSubscriptions();
  }, [])


  /**
   * 
   */
  function refreshSubscriptions() {
    // get list of subscriptions
    fetch("http://localhost:3000/subs")
      .then(res => {
        res.json()
           .then(data => {
              setSubsList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListSubscriptions = () => {

    if (subsList && subsList.length > 0) {
      if (subsOpen.length < 1) {
        const aSize = subsList.length;
        let tAry = Array(aSize).fill(false);
        setSubsOpen(tAry);
      }

      return subsList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...subsOpen];
                tempAry[idx] = !tempAry[idx];
                setSubsOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={subsOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={subsOpen[idx]}>
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
              <ListSubscriptions/>
            </>
  )
}
