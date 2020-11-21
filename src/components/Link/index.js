import React from 'react'
import {useSpring, animated} from 'react-spring'
import './styles.css'

export default function Link(props) {
  const [{ scale }, setSpring] = useSpring(() => ({ scale: 1 }))

  return (
    <animated.a
      className="Link"
      href={props.href}
      onMouseEnter={() => setSpring({ scale: 1.05 })}
      onMouseLeave={() => setSpring({ scale: 1 })}
      style={{ transform: scale.interpolate(s => `scale(${s})`) }}>
        {props.children}
    </animated.a>
  )
}
