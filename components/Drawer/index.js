import React, { useState, useRef } from 'react'
import './index.sass'
import Icons from '../../utils/icons'

let drawerTimeout = null

const Drawer = ({
  children,
  header = null,
  defaultOpen = false,
  disableAction,
  onOpened,
  onClosed,
  useOpen
}) => {
  const [drawerOpen_, setDrawerOpen] = useState(defaultOpen)
  const [drawerEntered, setDrawerEntered] = useState(defaultOpen)
  const contentRef = useRef()

  const drawerOpen = useOpen !== undefined ? useOpen : drawerOpen_

  return (
    <div className="drawer">
      <div
        className={'drawer-header' + (disableAction ? ' disable-action' : '')}
        onClick={() => {
          if (disableAction) {
            return
          }
          setDrawerOpen(!drawerOpen)
          clearTimeout(drawerTimeout)
          if (!drawerOpen) {
            drawerTimeout = setTimeout(() => {
              setDrawerEntered(true)
              if (onOpened) {
                onOpened()
              }
            }, 300)
          } else {
            setDrawerEntered(false)
            if (onClosed) {
              setTimeout(() => onClosed(), 200)
            }
          }
        }}>
        <div className="content">{header}</div>
        <div className="button">
          {!disableAction &&
            (drawerOpen ? <Icons.AreaExpanded /> : <Icons.AreaCollapsed />)}
        </div>
      </div>
      <div
        ref={contentRef}
        className={`drawer-body ${drawerOpen ? 'open' : ''}`}
        style={{
          maxHeight: drawerOpen ? contentRef.current.scrollHeight : 0,
          overflowY: drawerEntered ? 'auto' : 'hidden',
          animationDuration: '200ms'
        }}>
        {children}
      </div>
    </div>
  )
}

export default Drawer
