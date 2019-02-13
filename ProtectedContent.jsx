import React, { Component } from "react"
import Recaptcha from "react-recaptcha"
import { Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import PropTypes from 'prop-types'


export default class ProtectedContent extends Component {

  constructor(props) {
    super(props)
    this.verifyCallback = this.verifyCallback.bind(this);

    this.state = {
      isVerified: false
    }
  }
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    text: PropTypes.String,
    icon: PropTypes.String,
    
  }

  state = { open: false }
  state = { isVerified: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  verifyCallback(response) {

    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }

  /*if user hasn't verified as a user -> returns captcha to verify
    if user has verified as a user -> returns protected content */
  CaptchaOrEmail () {
    const { children } = this.props
    return this.state.isVerified
      ? 
        <p className="emailStyling"> {children} </p>
      :
        (<Recaptcha
        sitekey="6Les03sUAAAAABzQcx8tss96Vwe2DcZvCo4-_qkx"
        verifyCallback={this.verifyCallback}
        />)
  }

  
  render () {
    const { open, size } = this.state
    const { text } = this.props
    return (
      <div>
        <p className="replacement" onClick={this.show('tiny')}>{text}</p>
        <Modal 
         className={styles.modal}
         size={size}
         open={open}
         onClose={this.close}
        >
          <Modal.Header>Please verify that you're not a robot</Modal.Header>
          <Modal.Content>
            <center>
              {this.CaptchaOrEmail()}
            </center>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

