import {Component} from 'react'
import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

class SearchUnorder extends Component {
  render() {
    const {details} = this.props
    const {name, code} = details

    return (
      <Link to={`/state/${code}`}>
        <li className="search-list">
          <button type="button" className="search-list-btn">
            <p className="un-state-name">{name}</p>
            <div className="state-code-con">
              <p className="state-code">{code}</p>
              <BiChevronRightSquare className="right-square" />
            </div>
          </button>
          <hr />
        </li>
      </Link>
    )
  }
}

export default SearchUnorder
