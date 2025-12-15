import React from 'react'
import { useSelector } from 'react-redux'
import './index.sass'
import PendantButtonsBar from '../../components/PendantButtonsBar'

const Main = ({ children }) => {
  const barVisible = useSelector(state => state.pendantButtonsBar.visible)

  return (
    <main className="internal">
      <div className="main-container">{children}</div>
      <aside className={`bar-container${barVisible ? ' visible' : ''}`}>
        <PendantButtonsBar />
      </aside>
    </main>
  )
}

export default Main
