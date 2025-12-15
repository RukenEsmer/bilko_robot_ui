import React from 'react'
import { useSelector } from 'react-redux'
import './index.sass'

import NavigationMenu from '../NavigationMenu'
import ProgramModes from '../ProgramModes'

import routes from '../../routes'

const Sidebar = () => {
  const sidebarVisible = useSelector(state => state.sidebar.sidebarVisible)

  return (
    sidebarVisible && (
      <aside className="sidebar">
        <NavigationMenu routes={routes} />
        <ProgramModes />
      </aside>
    )
  )
}

export default Sidebar
