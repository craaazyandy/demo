import React, { useState, useEffect  } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {
  const [setupIntentList, setSetupIntentList] = useState([]);
  const [setupIntentOpen, setSetupIntentOpen] = useState([]);

  useEffect(() => {
    refreshSetupIntents();
  }, [])


  /**
   * 
   */
  function refreshSetupIntents() {
    // get list of setup intents
    fetch("http://localhost:3000/setup_intents")
      .then(res => {
        res.json()
           .then(data => {
              setSetupIntentList(data.data);
           })
           .catch(err => console.log('json() error:' + err))
      })
      .catch(err => console.log('res error:' +err))
  }


  /**
   * 
   */
  const ListSetupIntents = () => {

    if (setupIntentList && setupIntentList.length > 0) {
      if (setupIntentOpen.length < 1) {
        const aSize = setupIntentList.length;
        let tAry = Array(aSize).fill(false);
        setSetupIntentOpen(tAry);
      }

      return setupIntentList.map((data, idx) => {
        const id = data.id;
        const cu = data.customer;

        return (
          <li key={id}>
            <Button
              onClick={() => {
                let tempAry = [...setupIntentOpen];
                tempAry[idx] = !tempAry[idx];
                setSetupIntentOpen(tempAry);
              }}
              aria-controls={id}
              aria-expanded={setupIntentOpen[idx]}
            >{id} ({cu})</Button>
            <Collapse in={setupIntentOpen[idx]}>
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
      <ListSetupIntents/>
    </>
  )
}
