import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'

const filesPath = 'uploadedFiles'

class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.object
  }

  onFilesDrop = files => {
    return this.props.firebase.uploadFiles(filesPath, files, filesPath)
  }

  onFileDelete = (file, key) => () => {
    return this.props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
  }

  render() {
    const { uploadedFiles } = this.props

    return (
      <div>
        <Dropzone onDrop={this.onFilesDrop}>
          <div>Drag and drop files here or click to select</div>
        </Dropzone>
        {uploadedFiles && (
          <div>
            <h3>Uploaded file(s):</h3>
            {map(uploadedFiles, (file, key) => (
              <div key={file.name + key}>
                <span>{file.name}</span>
                <button onClick={this.onFileDelete(file, key)}>
                  Delete File
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  firebaseConnect([{ path: filesPath }]),
  connect(({ firebase: { data } }) => {
    console.log('data', data)
    return {
      uploadedFiles: data[filesPath]
    }
  })
)(Uploader)
