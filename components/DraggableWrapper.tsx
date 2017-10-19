import * as React from 'react'
import DefaultDraggable from './DefaultDraggable'

export interface DraggableProps {
  size?: number
  onMouseDown?: any
  onTouchStart?: any
  children?: any
}

const DraggableWrapper: React.SFC<DraggableProps> = ({
  children: Draggable = <DefaultDraggable size={40} />,
  onMouseDown,
  onTouchStart,
}) => {
  return (
    <g onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
      {Draggable}
    </g>
  )
}

export default DraggableWrapper
