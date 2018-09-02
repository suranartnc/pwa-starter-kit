import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { compose, withHandlers, setPropTypes } from 'recompose'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'

const filesPath = 'uploadedFiles'

const Uploader = ({ uploadedFiles, onFileDelete, onFilesDrop }) => (
  <div>
    <Dropzone onDrop={onFilesDrop}>
      <div>Drag and drop files here or click to select</div>
    </Dropzone>
    {uploadedFiles && (
      <div>
        <h3>Uploaded file(s):</h3>
        {map(uploadedFiles, (file, key) => (
          <div key={file.name + key}>
            <span>{file.name}</span>
            <button onClick={() => onFileDelete(file, key)}>Delete File</button>
          </div>
        ))}
      </div>
    )}
  </div>
)

Uploader.propTypes = {
  firebase: PropTypes.object.isRequired,
  uploadedFiles: PropTypes.object,
  onFileDelete: PropTypes.func.isRequired,
  onFilesDrop: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect([{ path: filesPath }]),
  connect(({ firebase: { data } }) => ({
    uploadedFiles: data[filesPath]
  })),
  setPropTypes({
    firebase: PropTypes.object.isRequired
  }),
  withHandlers({
    onFilesDrop: props => files => {
      return props.firebase.uploadFiles(filesPath, files, filesPath)
    },
    onFileDelete: props => (file, key) => {
      return props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
    }
  })
)(Uploader)
