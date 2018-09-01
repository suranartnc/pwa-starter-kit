import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

export default function(ComposedComponent) {
  class Authentication extends Component {
    isAuth() {
      const { auth } = this.props

      return isLoaded(auth) && !isEmpty(auth)
    }

    componentDidMount() {
      if (!this.isAuth()) {
        this.props.history.push('/')
      }
    }

    componentDidUpdate() {
      if (!this.isAuth()) {
        this.props.history.push('/')
      }
    }

    render() {
      if (this.isAuth()) {
        return <ComposedComponent {...this.props} />
      }

      return null
    }
  }

  return compose(
    withRouter,
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth }))
  )(Authentication)
}
