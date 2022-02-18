import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import StateTop from '../StateTop'
import Charts from '../Charts'

import './index.css'

class StateSpecific extends Component {
  state = {
    Category: 'confirmed',
  }

  changeCategory = id => {
    this.setState({Category: id})
  }

  render() {
    const {Category} = this.state
    return (
      <div className="state-specific-main-con">
        <Header />
        <StateTop Category={Category} changeCategory={this.changeCategory} />
        <Charts Category={Category} changeCategory={this.changeCategory} />
        <Footer />
      </div>
    )
  }
}

export default StateSpecific
