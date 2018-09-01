import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

import Layout from '@common/components/Layout'

const HomePageTitle = styled.h1`
  color: #ff0000;
`

const LogoutButton = styled(Button).attrs({
  type: 'primary',
  icon: 'logout',
  size: 'large'
})``

class HomePage extends Component {
  logoutHandler = () => {
    this.props.firebase.logout()
  }

  render() {
    const {
      auth: { displayName }
    } = this.props

    return (
      <Layout>
        <HomePageTitle>Hi! {displayName}</HomePageTitle>
        <LogoutButton onClick={this.logoutHandler}>Logout</LogoutButton>
      </Layout>
    )
  }
}

export default HomePage
