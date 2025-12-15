import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './index.sass'

import Icons from '../../utils/icons'
import Button from '../Button'

const DisableableLink = ({ children, disabled, ...rest }) => {
  return disabled ? (
    <span className="go-back disabled">{children}</span>
  ) : (
    <Link {...rest}>{children}</Link>
  )
}

const PageHeader = ({
  pathname,
  title,
  headerTitle,
  onClick,
  children,
  customClass = '',
  showBackButton = true,
  backButtonAnimated = true,
  showRightBg = true,
  disableButton = false
}) => {
  const history = useHistory()

  return (
    <header className={`page-header ${customClass}`}>
      {showBackButton &&
        (pathname ? (
          <DisableableLink
            disabled={disableButton}
            className={`go-back${
              backButtonAnimated ? ' animated fadeInLeft faster-400' : ''
            }`}
            to={{ pathname: pathname }}>
            <Icons.GoBack />
          </DisableableLink>
        ) : (
          <Button
            disabled={disableButton}
            type={`clear go-back${
              backButtonAnimated ? ' animated fadeInLeft faster-400' : ''
            }`}
            onClick={onClick ? onClick : () => history.goBack()}>
            <Icons.GoBack />
          </Button>
        ))}
      <div className="inner animated fadeInDown faster-400">
        {title || headerTitle}
      </div>
      {children && (
        <div
          className={`right${
            showRightBg ? ' bg' : ''
          } animated fadeIn faster-200`}
          style={{ animationDelay: '200ms' }}>
          {children}
        </div>
      )}
    </header>
  )
}

export default PageHeader
