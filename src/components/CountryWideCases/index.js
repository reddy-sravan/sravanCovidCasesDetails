import {Component} from 'react'

import './index.css'

class TotalCases extends Component {
  render() {
    const {details} = this.props
    const {confirmed, recovered, deceased} = details
    const active = confirmed - (recovered + deceased)
    return (
      <ul className="total-cases-con">
        <li
          className="total-card-con confirm-color"
          testid="countryWideConfirmedCases"
        >
          <p>Confirmed</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg"
            className="confirm-image"
            alt="country wide confirmed cases pic"
          />
          <p>{confirmed}</p>
        </li>
        <li
          className="total-card-con active-color"
          testid="countryWideActiveCases"
        >
          <p>Active</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg"
            className="confirm-image"
            alt="country wide active cases pic"
          />
          <p>{active}</p>
        </li>
        <li
          className="total-card-con recovered-color"
          testid="countryWideRecoveredCases"
        >
          <p>Recovered</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg"
            className="confirm-image"
            alt="country wide recovered cases pic"
          />
          <p>{recovered}</p>
        </li>
        <div
          className="total-card-con deceased-color"
          testid="countryWideDeceasedCases"
        >
          <p>Deceased</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg"
            className="confirm-image"
            alt="country wide deceased cases pic"
          />
          <p>{deceased}</p>
        </div>
      </ul>
    )
  }
}
export default TotalCases
