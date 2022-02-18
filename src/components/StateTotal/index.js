import {Component} from 'react'

import './index.css'

class StateTotal extends Component {
  render() {
    const {details, Category, changeCategory} = this.props
    const {confirmed, recovered, deceased} = details
    const active = confirmed - (recovered + deceased)

    const changingToConfirm = () => {
      changeCategory('confirmed')
    }
    const changingToActive = () => {
      changeCategory('active')
    }
    const changingToRecovered = () => {
      changeCategory('recovered')
    }
    const changingToDeceased = () => {
      changeCategory('deceased')
    }

    const categoryStyle =
      Category === 'confirmed' ? 'confirm-background' : 'sp-confirm'
    const activeStyle =
      Category === 'active' ? 'active-background' : 'sp-active'
    const recoveredStyle =
      Category === 'recovered' ? 'recovered-background' : 'sp-recovered'
    const deceasedStyle =
      Category === 'deceased' ? 'deceased-background' : 'sp-deceased'
    return (
      <ul className="state-specific-unorder-con">
        <li title="confirmed" testid="stateSpecificConfirmedCasesContainer">
          <button
            type="button"
            className={`${categoryStyle}`}
            onClick={changingToConfirm}
          >
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg"
              className="image"
              alt="state specific confirmed cases pic"
            />
            <p>{confirmed}</p>
          </button>
        </li>
        <li title="active" testid="stateSpecificActiveCasesContainer">
          <button
            type="button"
            className={`${activeStyle}`}
            onClick={changingToActive}
          >
            <p>Active</p>
            <img
              src="https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg"
              className="image"
              alt="state specific active cases pic"
            />
            <p>{active}</p>
          </button>
        </li>
        <li title="recovered" testid="stateSpecificRecoveredCasesContainer">
          <button
            type="button"
            className={`${recoveredStyle}`}
            onClick={changingToRecovered}
          >
            <p>Recovered</p>
            <img
              src="https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg"
              className="image"
              alt="state specific recovered cases pic"
            />
            <p>{recovered}</p>
          </button>
        </li>
        <li title="deceased" testid="stateSpecificDeceasedCasesContainer">
          <button
            type="button"
            className={`${deceasedStyle}`}
            onClick={changingToDeceased}
          >
            <p>Deceased</p>
            <img
              src="https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg"
              className="image"
              alt="state specific deceased cases pic"
            />
            <p>{deceased}</p>
          </button>
        </li>
      </ul>
    )
  }
}

export default StateTotal
