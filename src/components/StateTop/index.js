import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import StateTotal from '../StateTotal'
import TopDistricts from '../TopDistricts'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class StateTop extends Component {
  state = {
    name: '',
    updated: '',
    details: [],
    districts: [],
    status: apiConstants.initial,
  }

  componentDidMount = async () => {
    this.setState({status: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const name = statesList.filter(each => each.state_code === stateCode)

    if (response.ok) {
      const data = await response.json()

      const dat = new Date(data[stateCode].meta.last_updated)
      const day = JSON.stringify(dat.getDate())
      const len = day.length
      let dayth
      switch (day[len - 1]) {
        case '1':
          dayth = 'st'
          break
        case '2':
          dayth = 'nd'
          break
        case '3':
          dayth = 'rd'
          break
        default:
          dayth = 'th'
          break
      }

      let monthName
      switch (dat.getMonth()) {
        case 0:
          monthName = 'Jan'
          break
        case 1:
          monthName = 'Feb'
          break
        case 2:
          monthName = 'Mar'
          break
        case 3:
          monthName = 'Apr'
          break
        case 4:
          monthName = 'May'
          break
        case 5:
          monthName = 'Jun'
          break
        case 6:
          monthName = 'Jul'
          break
        case 7:
          monthName = 'Aug'
          break
        case 8:
          monthName = 'Sep'
          break
        case 9:
          monthName = 'Oct'
          break
        case 10:
          monthName = 'Nov'
          break
        case 11:
          monthName = 'Dec'
          break
        default:
          break
      }

      const date = `${monthName}
       ${dat.getDate()}${dayth} ${dat.getFullYear()} `

      const details = data[stateCode].total
      const {districts} = data[stateCode]

      const list = Object.keys(districts).map(each => {
        const active =
          districts[each].total.confirmed -
          (districts[each].total.recovered + districts[each].total.deceased)
        districts[each].total.active = active

        return [each, districts[each].total]
      })

      this.setState({
        name: name[0].state_name,
        updated: date,
        details,
        districts: list,
        status: apiConstants.success,
      })
    }
  }

  renderLoader = () => (
    <button type="button" className="loader" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </button>
  )

  renderSuccessView = () => {
    const {name, updated, details, districts} = this.state
    const {Category, changeCategory} = this.props
    return (
      <div className="specific-state-top-con">
        <div className="specific-state-name-test-con">
          <div className="state-name-con">
            <h1 className="state-top-name">{name}</h1>
            <p className="state-updated-date">{`Last updated on ${updated}`}</p>
          </div>
          <div className="tested-con">
            <p>Tested</p>
            <p>{details.tested}</p>
          </div>
        </div>
        <StateTotal
          details={details}
          Category={Category}
          changeCategory={changeCategory}
        />
        <TopDistricts
          details={districts}
          Category={Category}
          changeCategory={changeCategory}
        />
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
    return this.rerender()
  }
}

export default withRouter(StateTop)
