import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { map, omit } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'

import Dropzone from 'react-dropzone'

const filesPath = 'uploadedFiles'

class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    firestore: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.object
  }

  onFilesDrop = files => {
    return this.props.firebase.uploadFiles(filesPath, files).then(data => {
      return data.map(({ uploadTaskSnapshot: { metadata } }) => {
        const cleanedMetadata = omit(metadata, [
          'cacheControl',
          'contentLanguage',
          'contentDisposition',
          'contentEncoding',
          'customMetadata',
          'metageneration',
          'generation'
        ])

        return this.props.firestore.add(filesPath, cleanedMetadata)
      })
    })
  }

  onFileDelete = (file, key) => () => {
    return this.props.firebase.deleteFile(file.fullPath)
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
  firestoreConnect([filesPath]),
  connect(({ firestore: { data } }) => {
    return {
      uploadedFiles: data[filesPath]
    }
  })
)(Uploader)
