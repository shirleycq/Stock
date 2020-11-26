import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; //import router, route matchers and navigation
import Home from './Home';
import Stock from './Stock/Stock';




export default function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">Home</Link> | <Link to="/stock">Stocks</Link> 
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stock" component={Stock} />
        </Switch>
      </div>
    </Router>
  )
}


