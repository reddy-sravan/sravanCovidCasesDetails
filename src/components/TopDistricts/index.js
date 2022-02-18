import {Component} from 'react'

import './index.css'

class TopDistricts extends Component {
  render() {
    const {details, Category} = this.props

    const filter = details.map(each => {
      if (Number.isNaN(each[1][Category]) || each[1][Category] === undefined) {
        return {
          name: each[0],
          val: 0,
        }
      }
      return {name: each[0], val: each[1][Category]}
    })

    function sorted(a, b) {
      if (a.val > b.val) {
        return -1
      }
      if (b.val > a.val) {
        return 1
      }
      return 0
    }

    filter.sort(sorted)

    return (
      <div className="districts-main-con">
        <h1 className="top-dist-head"> Top Districts</h1>
        <ul className="Top-dist-main-con" testid="topDistrictsUnorderedList">
          {filter.map(each => (
            <li className="top-districts-list" key={each.name}>
              <p>{each.val}</p>
              <p className="top-dist-name">{each.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TopDistricts
