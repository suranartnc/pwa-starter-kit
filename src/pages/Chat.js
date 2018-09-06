import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

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
  render() {
    return (
      <Layout>
        <Container>
          <Bubble>Hello!</Bubble>
          <Bubble>Welcome to Dialogflow</Bubble>
          <Bubble type="me">Hi!</Bubble>
          <InputContainer>
            <Input placeholder="Message..." />
          </InputContainer>
        </Container>
      </Layout>
    )
  }
}

export default ChatPage
