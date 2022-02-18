import {Component} from 'react'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-con">
        <h1 className="footer-head">
          COVID19 <span className="footer-span">INDIA</span>
        </h1>
        <p className="footer-para">
          we stand with everyone fighting on the front lines
        </p>
        <div className="icons-con">
          <VscGithubAlt className="icon" />
          <FiInstagram className="icon" />
          <FaTwitter className="icon" />
        </div>
      </div>
    )
  }
}

export default Footer
