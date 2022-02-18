import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'

import NotFound from './components/NotFound'
import StateSpecific from './components/StateSpecific'
import About from './components/About'

import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/state/:stateCode" component={StateSpecific} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
