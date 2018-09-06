import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Layout from '@common/components/Layout'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 48px);
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

const Bubble = styled.div`
  border: 1px solid ${({ type }) => (type === 'me' ? '#888' : '#08c')};
  background: ${({ type }) => (type === 'me' ? '#fff' : '#08c')};
  color: ${({ type }) => (type === 'me' ? '#888' : '#fff')};
  padding: 7px 10px;
  margin: 5px;
  border-radius: 10px;
  align-self: ${({ type }) => (type === 'me' ? 'flex-end' : 'flex-start')};
`

const InputContainer = styled.div`
  width: 100%;
  padding: 5px;
`

class ChatPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    chatMessages: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
      })
    )
  }

  state = {
    messageInput: ''
  }

  onMessageSubmit = e => {
    e.preventDefault()

    if (this.state.messageInput.replace(/^\s+|\s+$/gm, '') === '') {
      return
    }

    this.props.dispatch({
      type: 'CHAT_MESSAGE_PUSH',
      payload: {
        type: 'me',
        message: this.state.messageInput
      }
    })

    this.setState({
      messageInput: ''
    })
  }

  onInputChanged = e => {
    this.setState({
      messageInput: e.target.value
    })
  }

  render() {
    return (
      <Layout>
        <Container>
          {this.props.chatMessages.map(function({ type, message }, index) {
            return (
              <Bubble key={index} type={type}>
                {message}
              </Bubble>
            )
          })}
          <InputContainer>
            <form onSubmit={this.onMessageSubmit}>
              <Input
                placeholder="Message..."
                onChange={this.onInputChanged}
                value={this.state.messageInput}
              />
            </form>
          </InputContainer>
        </Container>
      </Layout>
    )
  }
}

export default compose(
  connect(function({ chatMessages }) {
    return { chatMessages }
  })
)(ChatPage)
