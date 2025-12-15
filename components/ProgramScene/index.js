import React, { Component } from 'react'
import './index.sass'
import { MainSceneUtil, setSceneRef, resizeToFit } from '../../utils'

const ProgramScene = () => {
  return <Preview />
}

class Preview extends Component {
  constructor(props) {
    super(props)
    this.viewer = null
  }

  componentDidMount = () => {
    try {
      this.viewer = new MainSceneUtil({ container: 'preview' })
      setSceneRef(this.viewer)
      resizeToFit()
    } catch (error) {
      console.error(error)
    }
  }

  componentWillUnmount = () => {
    if (this.viewer) {
      this.viewer.removeListener()
      this.viewer.renderer.renderLists.dispose()
    }
    setSceneRef(null)
  }

  shouldComponentUpdate = () => {
    return false
  }

  render = () => {
    return (
      <div className="preview-container">
        <div id="preview" className="box preview" />
        <div id="scene-gui" />
      </div>
    )
  }
}

export default ProgramScene
