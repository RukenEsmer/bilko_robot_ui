import React from 'react'
import './index.sass'
import UnderDevelopmentImg from '../../assets/images/under-development.png'

const Oops = () => (
  <div className="oops">
    <img
      src={UnderDevelopmentImg}
      className="animated bounceIn faster"
      alt="Geliştirilme Aşamasında"
      style={{ animationDelay: '0', animationDuration: '200ms' }}
    />
    <h2
      className="animated bounceIn faster"
      style={{ animationDelay: '200ms', animationDuration: '200ms' }}>
      Oops!
      <br />
      Looks like the page you are looking for is under development.
    </h2>
    <p
      className="animated bounceIn faster"
      style={{ animationDelay: '400ms', animationDuration: '200ms' }}>
      Thank you for your kindness :)
    </p>
  </div>
)

export default Oops
