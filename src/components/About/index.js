import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class About extends Component {
  state = {
    faqs: [],

    status: apiConstants.initial,
  }

  componentDidMount = async () => {
    this.setState({status: apiConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      this.setState({
        faqs: data.faq,

        status: apiConstants.success,
      })
    }
  }

  renderLoader = () => (
    <button type="button" className="loader" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </button>
  )

  renderSuccessView = () => {
    const {faqs} = this.state
    return (
      <div className="about-con">
        <h1 className="about-head">About</h1>
        <p className="about-para">
          Last updated on jan 23<sup>rd</sup> 2021
        </p>
        <p className="about-sub-head">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="about-unorder-con" testid="faqsUnorderedList">
          {faqs.map(each => (
            <li key={each.qno}>
              <p className="question">{each.question}</p>
              <p className="answer">{each.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  rerender = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.rerender()}
        <Footer />
      </div>
    )
  }
}

export default About
