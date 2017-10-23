import * as React from 'react'
import * as classnames from 'classnames'

export interface DraggableProps {
  coordinates?: { x: number; y: number }
  pressed?: boolean
  rotation?: number
  size?: number
  style?: React.CSSProperties
}

interface DraggableStyle {}

const defaultStyle: React.CSSProperties = {
  backgroundColor: 'black',
  borderRadius: 20,
  boxSizing: 'border-box',
  cursor: 'pointer',
  height: 40,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  transition: 'width 300ms ease, height 300ms ease, border-radius 300ms ease, background-color 300ms ease',
  width: 40,
}

const Draggable = ({ coordinates, pressed = false, rotation = 0, size = 40, style }: DraggableProps): JSX.Element => {
  return (
    <div
      style={{
        ...defaultStyle,
        ...style,
        width: size,
        height: size,
        top: coordinates ? coordinates.y : 0,
        left: coordinates ? coordinates.x : 0,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      className={classnames({ pressed })}
    />
  )
}

export default Draggable
