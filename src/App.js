import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

import NotFound from './components/NotFound'
import StateWiseCases from './components/StateWiseCases'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />

    <Route exact path="/state/:stateCode" component={StateWiseCases} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
