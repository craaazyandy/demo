import React, { useState } from 'react'
import logo from './img/qplogo.png'
import './App.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default function Admin() {

  return (
    <div className="App">
      <div className="AdminContent">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <div className="AdminItem">
          <div>
            <h4>Connected Accounts</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Customers</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Subscriptions</h4>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
          <div>
            <h4>Account Balance</h4>
            <p>$123.45</p>
          </div>
        </div>
      </div>
    </div>
  )
}
