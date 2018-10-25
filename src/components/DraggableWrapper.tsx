import React from 'react'
import { Draggable as DefaultDraggable } from './Draggable'

export interface DraggableWrapperProps {
  children?: any
  onMouseDown?: any
  onTouchStart?: any
}

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  touchAction: 'none',
}

export const DraggableWrapper = ({
  children: Draggable = <DefaultDraggable size={40} />,
  onMouseDown,
  onTouchStart,
}: DraggableWrapperProps) => {
  return (
    <div
      className="circular-slider__draggable-wrapper"
      style={defaultStyle}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {Draggable}
    </div>
  )
}

export default DraggableWrapper
