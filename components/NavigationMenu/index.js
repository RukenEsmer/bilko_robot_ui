import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './index.sass'
import Icons from '../../utils/icons'

const NavigationMenu = ({ routes }) => {
  const programState = useSelector((state) => state.programStatus.programState)

  const disabled = programState === 'Running'

  return (
    <div className="navigation-menu">
      {disabled ? (
        <div className={'navigation-title disabled'}>
          <span>
            <Icons.Home />
          </span>
        </div>
      ) : (
        <Link to={'/'} className={'navigation-title'}>
          <span>
            <Icons.Home />
          </span>
        </Link>
      )}
    </div>
  )
}

export default NavigationMenu
