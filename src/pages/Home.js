import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'

import Layout from '@common/components/Layout'
import UploadProvider from '@common/components/UploadProvider'

const HomePageTitle = styled.h1`
  color: #ff0000;
`

const LogoutButton = styled(Button).attrs({
  type: 'primary',
  icon: 'logout',
  size: 'large'
})``

class HomePage extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.shape({
      displayName: PropTypes.string.isRequired
    }).isRequired
  }

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

        <UploadProvider filesPath="uploadedFiles">
          {({
            Dropzone,
            uploadedFiles,
            getDownloadURL,
            onFilesDrop,
            onFileDelete
          }) => {
            return (
              <div>
                <Dropzone accept="image/jpeg, image/png" onDrop={onFilesDrop}>
                  <div>Drag and drop files here or click to select</div>
                </Dropzone>

                {uploadedFiles.length > 0 && (
                  <div>
                    <h3>Uploaded file(s):</h3>

                    {uploadedFiles.map(file => {
                      const { id, name } = file

                      return (
                        <div key={name + id}>
                          <a href={getDownloadURL(file)} target="_blank">
                            {name}
                          </a>
                          <button onClick={onFileDelete(file)}>
                            Delete File
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }}
        </UploadProvider>
      </Layout>
    )
  }
}

export default HomePage
