import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import TotalCases from '../CountryWideCases'
import SearchUnorder from '../SearchUnorder'

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

class Home extends Component {
  state = {
    countryWideList: [],
    inputText: '',
    searchInput: false,
    status: apiConstants.initial,
    asc: true,
  }

  componentDidMount = async () => {
    this.setState({status: apiConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const list = statesList.map(each => [
        each.state_name,
        data[each.state_code].total,
        data[each.state_code].meta.population,
      ])
      this.setState({
        countryWideList: list,
        status: apiConstants.success,
      })
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  userInput = event => {
    this.setState({inputText: event.target.value})
    if (event.target.value.length >= 1) {
      this.setState({searchInput: true})
    } else {
      this.setState({searchInput: false})
    }
  }

  renderLoader = () => (
    <button type="button" className="loader" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </button>
  )

  ascending = () => {
    const {countryWideList, asc} = this.state
    if (asc !== true) {
      this.setState({countryWideList: countryWideList.reverse(), asc: true})
    }
  }

  decending = () => {
    const {countryWideList, asc} = this.state
    if (asc !== false) {
      this.setState({countryWideList: countryWideList.reverse(), asc: false})
    }
  }

  renderSuccessView = () => {
    const {countryWideList, inputText, searchInput} = this.state

    let confirmed = 0
    let recovered = 0
    let tested = 0
    let deceased = 0
    countryWideList.map(each => {
      confirmed += each[1].confirmed
      tested += each[1].tested
      recovered += each[1].recovered
      deceased += each[1].deceased
      return null
    })

    const filteredList = statesList.filter(each =>
      each.state_name.toLowerCase().includes(inputText.toLowerCase()),
    )

    return (
      <>
        <div className="home-small-con">
          <div className="input-main-con">
            <div className="input-con">
              <BsSearch className="search" />
              <input
                type="search"
                className="input"
                placeholder="Enter the State"
                onChange={this.userInput}
              />
            </div>
            <ul
              className="search-unorder-list"
              testid="searchResultsUnorderedList"
            >
              {searchInput &&
                filteredList.map(each => (
                  <SearchUnorder
                    details={{name: each.state_name, code: each.state_code}}
                    key={each.state_code}
                  />
                ))}
            </ul>
          </div>

          <TotalCases details={{confirmed, tested, recovered, deceased}} />
        </div>
        <div className="table" testid="stateWiseCovidDataTable">
          <ul className="unorder-states">
            <li className="table-heading-list">
              <div className="asc-desc-con">
                <p>States/UT</p>
                <button
                  type="button"
                  className="asc-desc-btn"
                  onClick={this.ascending}
                  testid="ascendingSort"
                >
                  <FcGenericSortingAsc className="asc-desc" />
                </button>
                <button
                  type="button"
                  className="asc-desc-btn"
                  onClick={this.decending}
                  testid="descendingSort"
                >
                  <FcGenericSortingDesc className="asc-desc" />
                </button>
              </div>
              <p className="table-head">Confirmed</p>
              <p className="table-head">Active</p>
              <p className="table-head">Recovered</p>
              <p className="table-head">Deceased</p>
              <p className="table-head">Population</p>
            </li>
            <hr />

            {countryWideList.map(each => {
              const active =
                each[1].confirmed - (each[1].deceased + each[1].recovered)
              return (
                <li className="table-heading-list" key={each[0]}>
                  <p className="state-name">{each[0]}</p>
                  <p className="confirmed">{each[1].confirmed}</p>
                  <p className="active">{active}</p>
                  <p className="recovered">{each[1].recovered}</p>
                  <p className="deceased">{each[1].deceased}</p>
                  <p className="population">{each[2]}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </>
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
      <div className="home-main-con">
        <Header />
        {this.rerender()}
        <Footer />
      </div>
    )
  }
}
export default Home
