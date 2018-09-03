import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { omit, isEmpty } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'

import Dropzone from 'react-dropzone'

const filesPath = 'uploadedFiles'

function getStorageDownloadURL({ bucket, fullPath }) {
  const encodedFullPath = encodeURIComponent(fullPath)
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedFullPath}?alt=media`
}

function cleanUpMetaData(metadata) {
  const keysToOmit = [
    'cacheControl',
    'contentLanguage',
    'contentDisposition',
    'contentEncoding',
    'customMetadata',
    'metageneration',
    'generation'
  ]

  return omit(metadata, keysToOmit)
}

class Uploader extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    firestore: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.array
  }

  onFilesDrop = async files => {
    const uploadedData = await this.props.firebase.uploadFiles(filesPath, files)

    uploadedData.forEach(({ uploadTaskSnapshot: { metadata } }) => {
      const cleanedMetadata = cleanUpMetaData(metadata)
      this.props.firestore.collection(filesPath).add(cleanedMetadata)
    })
  }

  onFileDelete = file => async () => {
    this.props.firebase.deleteFile(file.fullPath)
    this.props.firestore
      .collection(filesPath)
      .doc(file.id)
      .delete()
  }

  render() {
    const { uploadedFiles } = this.props

    return (
      <div>
        <Dropzone onDrop={this.onFilesDrop}>
          <div>Drag and drop files here or click to select</div>
        </Dropzone>
        {!isEmpty(uploadedFiles) && (
          <div>
            <h3>Uploaded file(s):</h3>

            {uploadedFiles.filter(file => file !== null).map(file => {
              const { id, name } = file

              return (
                <div key={name + id}>
                  <a href={getStorageDownloadURL(file)} target="_blank">
                    {name}
                  </a>
                  <button onClick={this.onFileDelete(file)}>Delete File</button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  firestoreConnect([filesPath]),
  connect(({ firestore: { ordered } }) => {
    return {
      uploadedFiles: ordered[filesPath]
    }
  })
)(Uploader)
