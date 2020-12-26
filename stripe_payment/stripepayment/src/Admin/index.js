import React, { useState, useEffect, Suspense, lazy  } from 'react'
import logo from '../img/logo_transparent.png'
// import pigeon from './img/p.gif'
import '../App.css'
const AdminAccounts = lazy(() => import('./AdminAccounts'));
const AdminProducts = lazy(() => import('./AdminProducts'));
const AdminCustomers = lazy(() => import('./AdminCustomers'));
const AdminSubscriptions = lazy(() => import('./AdminSubscriptions'));
const AdminPaymentMethods = lazy(() => import('./AdminPaymentMethods'));
const AdminPaymentIntents = lazy(() => import('./AdminPaymentIntents'));
const AdminSetupIntents = lazy(() => import('./AdminSetupIntents'));
const AdminInvoices = lazy(() => import('./AdminInvoices'));

export default function Admin() {

  const Loading = () => {
    return (
      <div style={{margin:'auto'}}><img src={logo} alt="loading..."/></div>
    )
  }

  return (
    <div className="App">
      <div className="AdminContent">
        <div style={{margin:'auto'}}><img src={logo} alt="logo"/></div>
        <div className="AdminItem">
          <div>
            <h4>Connected Accounts</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminAccounts/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminProducts/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>Customers</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminCustomers/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>Subscriptions</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminSubscriptions/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>PaymentMethods</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminPaymentMethods/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>Invoices</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminInvoices/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>PaymentIntents</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminPaymentIntents/>
              </Suspense>
            </ul>
          </div>
          <div>
            <h4>SetupIntents</h4>
            <ul>
              <Suspense fallback={<div>loading...</div>}>
                <AdminSetupIntents/>
              </Suspense>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
