import React, { useState } from 'react'
import logo from './img/logo_transparent.png'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Admin from './Admin'
import Channels from './Channels'
import Subscription from './Subscription'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

const Landing = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Hello World</h3>
      </div>
    </div>
  )
}

const Refresh = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Link expired.  Please refresh your access link</h3>
      </div>
    </div>
  )
}

const Complete = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Thank you for setting up your Channel</h3>
        <p>You have completed your on boarding process</p>
        <p>Welcome to QP !!!</p>
      </div>
    </div>
  )
}

const Subscribed = () => {
  return (
    <div className="App">
      <div className="Content">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <h3>Thank you for your Subscription</h3>
        <p>On behaif of all the pigeons in the world, we thank you !!!</p>
        <p>Enjoy your channel !!!</p>
      </div>
    </div>
  )
}

const Example = () => {
  const [open, setOpen] = useState(false);
  const data = {
    "type": "object",
    "data": [
        {
            "name": "one",
            "function": "function-one",
            "level": 1
        },
        {
            "name": "two",
            "function": "function-two",
            "level": 2
        },
        {
            "name": "three",
            "function": "function-three",
            "level": 3
        }
    ]
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text"><div><pre>{JSON.stringify(data, null, 2) }</pre></div></div>
      </Collapse>
    </>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/refresh">
            <Refresh/>
        </Route>
        <Route exact path="/complete">
            <Complete/>
        </Route>
        <Route exact path="/subscribed">
            <Subscribed/>
        </Route>
        <Route exact path="/admin">
            <Admin/>
        </Route>
        <Route exact path="/channels">
            <Channels/>
        </Route>
        <Route exact path="/subscription/:channel/:tax/:cust">
            <Subscription/>
        </Route>
        <Route exact path="/example">
            <Example/>
        </Route>
        <Route><Landing/></Route>
      </Switch>
    </Router>
  );
}

export default App;
