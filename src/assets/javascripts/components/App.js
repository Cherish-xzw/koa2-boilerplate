import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from './Home'
import About from './About';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

export default App;
