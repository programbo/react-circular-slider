import * as React from 'react'

export interface DefaultDraggableProps {
  size?: number
  coordinates?: { x: number; y: number }
  rotation?: number
}

const DefaultDraggable = ({
  size = 40,
  coordinates = { x: 0, y: 0 },
  rotation = 0,
}: DefaultDraggableProps): JSX.Element => {
  const { x, y } = coordinates
  return <circle r={size / 2} cx={x} cy={y} />
}

export default DefaultDraggable
