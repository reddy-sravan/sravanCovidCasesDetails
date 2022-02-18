import {Component} from 'react'

import './index.css'

class NotFound extends Component {
  moveToHomeRoute = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="not-found-route">
        <img
          src="https://res.cloudinary.com/dtkkpth8w/image/upload/v1643902826/not_found_gmqxf7.png"
          alt="not-found-pic"
          className="not-found-image"
        />
        <h1 className="not-found-head">Page Not Found</h1>
        <p className="not-found-para">
          we are sorry, the page you requested could not be found
        </p>

        <button
          className="not-found-button"
          type="button"
          onClick={this.moveToHomeRoute}
        >
          Home
        </button>
      </div>
    )
  }
}

export default NotFound
