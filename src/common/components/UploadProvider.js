import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { omit } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'

import Dropzone from 'react-dropzone'

function getDownloadURL({ bucket, fullPath }) {
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
    uploadedFiles: PropTypes.array,
    children: PropTypes.func.isRequired
  }

  onFilesDrop = async files => {
    const { filesPath, firebase, firestore } = this.props

    const uploadedData = await firebase.uploadFiles(filesPath, files)
    uploadedData.forEach(({ uploadTaskSnapshot: { metadata } }) => {
      const cleanedMetadata = cleanUpMetaData(metadata)
      firestore.collection(filesPath).add(cleanedMetadata)
    })
  }

  onFileDelete = file => async () => {
    const { filesPath, firebase, firestore } = this.props

    firebase.deleteFile(file.fullPath)
    firestore
      .collection(filesPath)
      .doc(file.id)
      .delete()
  }

  render() {
    const { uploadedFiles, children } = this.props

    return children({
      Dropzone,
      getDownloadURL,
      uploadedFiles: uploadedFiles.filter(file => file !== null),
      onFilesDrop: this.onFilesDrop,
      onFileDelete: this.onFileDelete
    })
  }
}

UploadProvider.propTypes = {
  filesPath: PropTypes.string.isRequired
}

export default function UploadProvider(props) {
  const { filesPath } = props

  const EnhancedUploader = compose(
    firestoreConnect([filesPath]),
    connect(({ firestore: { ordered } }) => {
      return {
        uploadedFiles: ordered[filesPath] || []
      }
    })
  )(Uploader)

  return <EnhancedUploader {...props} />
}
