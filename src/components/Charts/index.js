import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import BarGraph from '../BarGraph'
import LineCharts from '../LineGraph'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class Charts extends Component {
  state = {
    specificDates: [],
    status: apiConstants.initial,
  }

  componentDidMount = async () => {
    this.setState({status: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const urls = 'https://apis.ccbp.in/covid19-timelines-data'
    const timeline = await fetch(urls)
    const timelinedata = await timeline.json()
    const timedata = Object.keys(timelinedata[stateCode].dates).map(each => {
      const active =
        timelinedata[stateCode].dates[each].total.confirmed -
        (timelinedata[stateCode].dates[each].total.recovered +
          timelinedata[stateCode].dates[each].total.deceased)

      timelinedata[stateCode].dates[each].total.active = active
      return {
        date: each,
        val: timelinedata[stateCode].dates[each].total,
      }
    })
    if (timeline.ok) {
      this.setState({
        specificDates: timedata,
        status: apiConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader" testid="timelinesDataLoader">
      <Loader type="TailSpin" height="50" width="50" color="grey" />
    </div>
  )

  renderSuccessView = () => {
    const {Category} = this.props
    const {specificDates} = this.state
    const date = specificDates.map(each => ({
      date: each.date,
      count: each.val[Category],
    }))

    const barData = date.reverse().slice(0, 11)

    const confirmData = specificDates.map(each => ({
      date: each.date,
      count: each.val.confirmed,
    }))

    const activeData = specificDates.map(each => ({
      date: each.date,
      count: each.val.active,
    }))

    const recoveredData = specificDates.map(each => ({
      date: each.date,
      count: each.val.recovered,
    }))

    const deceasedData = specificDates.map(each => ({
      date: each.date,
      count: each.val.deceased,
    }))

    const testedData = specificDates.map(each => ({
      date: each.date,
      count: each.val.tested,
    }))
    return (
      <div className="charts-main-con">
        <BarGraph data={barData} Category={Category} />
        <p className="daily-spread-para">Daily Spread Trends</p>
        <ul className="line-charts" testid="lineChartsContainer">
          <LineCharts
            data={confirmData}
            categoryStatus={Category}
            background="confirmBackground"
            color="#FF073A"
            key={1}
          />
          <LineCharts
            data={activeData}
            background="activeBackground"
            color="#007BFF"
            key={2}
          />
          <LineCharts
            data={recoveredData}
            background="recoveredBackground"
            color="#27A243"
            key={3}
          />
          <LineCharts
            data={deceasedData}
            background="deceasedBackground"
            color="#6C757D"
            key={4}
          />
          <LineCharts
            data={testedData}
            background="TestedBackground"
            color="#230F41"
            key={5}
          />
        </ul>
      </div>
    )
  }

  rerender = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return this.rerender()
  }
}

export default withRouter(Charts)
