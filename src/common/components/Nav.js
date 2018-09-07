import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

export default class Nav extends React.Component {
  state = {
    current: 'home'
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="chat">
          <Link to="/chat">Chat</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
