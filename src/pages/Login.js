import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import styled from 'styled-components'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

const FacebookButton = styled(Button).attrs({
  type: 'primary',
  icon: 'facebook',
  size: 'large'
})`
  background-color: #4267b1;
`

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

class LoginSection extends Component {
  loginHandler = () => {
    this.props.firebase.login({
      provider: 'facebook',
      type: 'popup'
    })
  }

  componentDidUpdate() {
    const { auth, history } = this.props

    if (isLoaded(auth)) {
      if (!isEmpty(auth)) {
        history.push('/home')
      }
    }
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <FacebookButton onClick={this.loginHandler}>
            Login with Facebook
          </FacebookButton>
        </Col>
      </Row>
    )
  }
}

const EnhancedLoginSection = compose(
  withRouter,
  withFirebase,
  connect(({ firebase: { auth } }) => {
    return { auth }
  })
)(LoginSection)

export default function LoginPage() {
  return (
    <Container>
      <EnhancedLoginSection />
    </Container>
  )
}
