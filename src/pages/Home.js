import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

import Layout from '@common/components/Layout'
import UploadProvider from '@common/components/UploadProvider'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 48px);
  justify-content: center;
  align-items: center;
`

class HomePage extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired
  }

  render() {
    const filesPath = 'uploadedFiles'

    return (
      <Layout>
        <Container>
          <UploadProvider filesPath={filesPath}>
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
                        flexDirection: 'column',
                        alignItems: 'center'
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
                      {uploadedFiles.map(file => {
                        const { id, name } = file

                        return (
                          <div key={name + id}>
                            <a href={getDownloadURL(file)} target="_blank">
                              {name}
                            </a>
                            <button onClick={onFileDelete(file)}>Delete</button>
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
