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
  cursor: 'pointer',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  transition: 'width 300ms ease, height 300ms ease, border-radius 300ms ease, background-color 300ms ease',
}

const getSize = (show: boolean, pressed: boolean, defaultSize: number) =>
  show ? (pressed ? defaultSize * 1.2 : defaultSize) : 0

const Draggable = ({
  coordinates,
  pressed = false,
  rotation = 0,
  size = 40,
  style,
}: DraggableProps): JSX.Element | null => {
  return (
    <div
      style={{
        ...defaultStyle,
        ...style,
        width: getSize(!!coordinates, pressed, size),
        height: getSize(!!coordinates, pressed, size),
        top: coordinates ? coordinates.y : 0,
        left: coordinates ? coordinates.x : 0,
        boxShadow: pressed ? '3px 3px 12px rgba(0, 0, 0, 0.25)' : '1px 1px 4px rgba(0, 0, 0, 0.75)',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        borderRadius: pressed ? size / 3 : size / 2,
        backgroundColor: pressed ? 'red' : 'black',
      }}
      className={classnames({ pressed })}
    />
  )
}

export default Draggable
