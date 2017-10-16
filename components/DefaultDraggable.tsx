import * as React from 'react'

export interface DefaultDraggableProps {
  size: number
}

const DefaultDraggable = ({ size }: DefaultDraggableProps): JSX.Element => {
  return <circle r={size / 2} />
}

export default DefaultDraggable
