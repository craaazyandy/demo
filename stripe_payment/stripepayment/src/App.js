import logo from './img/qplogo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

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
        <h3>Thank you!</h3>
        <p>You have completed your on boarding process</p>
        <p>Welcome to QP !!!</p>
      </div>
    </div>
  )
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
        <Route><Landing/></Route>
    </Switch>
    </Router>
  );
}

export default App;
