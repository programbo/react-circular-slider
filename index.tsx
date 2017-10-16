import * as React from 'react'

import { absMousePos, absTouchPos, pauseEvent } from './helpers/eventHelpers'

import DefaultRing from './components/DefaultRing'
import DefaultDraggable from './components/DefaultDraggable'

export interface CircularSliderProps {
  className?: string
  draggable?: JSX.Element
  endAngle?: number
  height?: number
  motion?: 'loop' | 'infinite' | 'once'
  onMove?: (value: number) => void
  onMoveEnd?: (value: number) => void
  radius?: number
  startAngle?: number
  value?: number
  width?: number
}

class CircularSlider extends React.Component<CircularSliderProps, {}> {
  public static defaultProps: CircularSliderProps = {
    draggable: undefined,
    endAngle: 360,
    height: 200,
    motion: 'once',
    onMove: value => {},
    onMoveEnd: value => {},
    radius: 360,
    startAngle: 0,
    value: 0,
    width: 200,
  }

  state = {
    pressed: false,
  }
  moveListenerArgs = (isTouch: boolean) => ({
    moveEventType: isTouch ? 'touchmove' : 'mousemove',
    moveHandler: isTouch ? this.handleTouchMove : this.handleMouseMove,
    // moveData: { passive: false },
  })
  endListenerArgs = (isTouch: boolean) => ({
    endEventType: isTouch ? 'touchend' : 'mouseup',
    endHandler: isTouch ? this.handleTouchEnd : this.handleMouseUp,
    // endData: { passive: false },
  })
  addEventListeners = (isTouch: boolean) => {
    this.setState({ pressed: true })
    const { moveEventType, moveHandler } = this.moveListenerArgs(isTouch)
    document.addEventListener(moveEventType, moveHandler)

    const { endEventType, endHandler } = this.endListenerArgs(isTouch)
    document.addEventListener(endEventType, endHandler)
  }
  removeEventListeners = (isTouch: boolean) => {
    this.setState({ pressed: false })
    const { moveEventType, moveHandler } = this.moveListenerArgs(isTouch)
    document.removeEventListener(moveEventType, moveHandler)

    const { endEventType, endHandler } = this.endListenerArgs(isTouch)
    document.removeEventListener(endEventType, endHandler)
  }
  handleMouseDown = (e: MouseEvent) => {
    pauseEvent(e)
    this.addEventListeners(false)
  }
  handleTouchStart = (e: TouchEvent) => {
    pauseEvent(e)
    this.addEventListeners(true)
  }
  handleMouseUp = (e: MouseEvent) => {
    pauseEvent(e)
    this.removeEventListeners(false)
  }
  handleTouchEnd = (e: TouchEvent) => {
    pauseEvent(e)
    this.removeEventListeners(true)
  }
  handleMouseMove = (e: MouseEvent) => {
    pauseEvent(e)
    const radialPos = this.calcRadialPos(absMousePos(e))
    this.props.onMove(radialPos)
  }
  handleTouchMove = (e: TouchEvent) => {
    pauseEvent(e)
    const radialPos = this.calcRadialPos(absTouchPos(e))
    this.props.onMove(radialPos)
  }
  calcRadialPos = ({ x, y }: { x: number; y: number }) => {
    const { x: containerX, y: containerY } = this.props.absoluteContainerFunc()
    const { relCenterPos } = this.props
    return {
      x: x - containerX - relCenterPos.x,
      y: -(y - containerY - relCenterPos.y),
    }
  }

  render() {
    const Draggable = this.props.draggable
    return (
      <svg
        className={this.props.className}
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        {this.props.children}
        <DefaultRing padding={10} radius={90} thickness={20} />
        <g
          style={{ cursor: 'pointer' }}
          onMouseDown={e => {
            console.log('onMouseDown', e)
          }}
          onTouchStart={e => {
            console.log('onTouchStart', e)
          }}
        >
          <DefaultDraggable size={40} />
        </g>
      </svg>
    )
  }
}

export default CircularSlider
