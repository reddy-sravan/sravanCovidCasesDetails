import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    status: false,
  }

  popupclose = () => {
    this.setState(prevState => ({status: !prevState.status}))
  }

  renderpopup = () => {
    const {match} = this.props
    const {path} = match
    const route = path.slice(1)

    const homeColor = route !== 'about' ? 'home-btn-light' : 'home-btn'
    const aboutColor = route === 'about' ? 'home-btn-light' : 'home-btn'
    return (
      <li className="popup-con">
        <div>
          <Link to="/">
            <button className={`${homeColor}`} type="button">
              Home
            </button>
          </Link>
          <Link to="/about">
            <button className={`${aboutColor}`} type="button">
              About
            </button>
          </Link>
        </div>
        <button type="button" className="close-con" onClick={this.popupclose}>
          <AiFillCloseCircle className="close" />
        </button>
      </li>
    )
  }

  render() {
    const {status} = this.state
    const {match} = this.props
    const {path} = match
    const route = path.slice(1)

    const homeColor = route !== 'about' ? 'home-btn-light' : 'home-btn'
    const aboutColor = route === 'about' ? 'home-btn-light' : 'home-btn'
    return (
      <>
        <nav>
          <ul className="navbar">
            <Link to="/" className="link">
              <h1 className="covid-main-head">
                COVID19<span className="head-span">INDIA</span>
              </h1>
            </Link>
            <li>
              <button
                className="menu-con"
                type="button"
                onClick={this.popupclose}
              >
                <img
                  className="ham-menu"
                  src="https://res.cloudinary.com/dtkkpth8w/image/upload/v1643854191/menu_dioo5e.png"
                  alt="menu"
                />
              </button>
            </li>

            <li className="above-large-con">
              <Link to="/">
                <button className={`${homeColor}`} type="button">
                  Home
                </button>
              </Link>
              <Link to="/about">
                <button className={`${aboutColor}`} type="button">
                  About
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        {status && this.renderpopup()}
      </>
    )
  }
}

export default withRouter(Header)
