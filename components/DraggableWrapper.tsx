import * as React from 'react'
import DefaultDraggable from './DefaultDraggable'

export interface DraggableProps {
  size?: number
  onMouseDown?: any
  onTouchStart?: any
  children?: any
}

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
}

const DraggableWrapper: React.StatelessComponent<DraggableProps> = ({
  children: Draggable = <DefaultDraggable size={40} />,
  onMouseDown,
  onTouchStart,
}) => {
  return (
    <div style={defaultStyle} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
      {Draggable}
    </div>
  )
}

export default DraggableWrapper
