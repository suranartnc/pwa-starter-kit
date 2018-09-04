import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Icon } from 'antd'

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

const Container = styled.div`
  display: flex;
  height: calc(100vh - 48px);
  justify-content: center;
  align-items: center;
`

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
        {/* <HomePageTitle>Hi! {displayName}</HomePageTitle> */}
        {/* <LogoutButton onClick={this.logoutHandler}>Logout</LogoutButton> */}

        <Container>
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
                  <Dropzone
                    style={{ border: '2px dashed #08c', borderRadius: '5px' }}
                    accept="image/jpeg, image/png"
                    onDrop={onFilesDrop}
                  >
                    <div
                      style={{
                        padding: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <Icon
                        type="cloud-upload"
                        theme="outlined"
                        style={{
                          fontSize: '64px',
                          color: '#08c'
                        }}
                      />
                      <span>Upload an image</span>
                    </div>
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
        </Container>
      </Layout>
    )
  }
}

export default HomePage
