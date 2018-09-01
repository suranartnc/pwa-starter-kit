import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import styled from 'styled-components'

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
    console.log('Login Button Clicked')
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

export default function LoginPage() {
  return (
    <Container>
      <LoginSection />
    </Container>
  )
}
