import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Layout from '@common/components/Layout'
import { Button } from 'antd'

const LogoutButton = styled(Button).attrs({
  type: 'primary',
  icon: 'logout',
  size: 'large'
})``

export default class AboutPage extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired
  }

  logoutHandler = () => {
    this.props.firebase.logout()
  }

  render() {
    return (
      <Layout>
        <LogoutButton onClick={this.logoutHandler}>Logout</LogoutButton>
      </Layout>
    )
  }
}
