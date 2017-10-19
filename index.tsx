import * as React from 'react'

import { absoluteMousePosition, absoluteTouchPosition, pauseEvent } from './helpers/eventHelpers'
import {
  angleToValue,
  calculateOrigin,
  calculateAngleFromOrigin,
  calculateRadialPosition,
  calculateRadialPositionFromValue,
  calculateAngleToPoint,
  absoluteContainerPosition,
  valueToRadians,
  Point,
} from './helpers/geometryHelpers'

import DefaultRing from './components/DefaultRing'
import DefaultDraggable from './components/DefaultDraggable'
import DraggableWrapper from './components/DraggableWrapper'

export interface MovementResponse {
  coordinates: Point
  value: number
}
export interface SliderProps {
  className?: string
  draggable?: any
  draggableOffset?: number
  maxValue?: number
  minValue?: number
  motion?: 'loop' | 'infinite' | 'once'
  onMove?: (response: MovementResponse) => void
  onMoveEnd?: (response: MovementResponse) => void
  radius?: number
  value?: number
  size?: number
}

export interface SliderState {
  pressed: boolean
}

export interface SliderStyles {
  [index: string]: React.CSSProperties
}

class CircularSlider extends React.Component<SliderProps, SliderState> {
  public static defaultProps: SliderProps = {
    draggable: undefined,
    draggableOffset: 0,
    maxValue: 100,
    minValue: 0,
    motion: 'once',
    onMove: value => {},
    onMoveEnd: value => {},
    radius: 100,
    value: 0,
    size: 200,
  }

  public state: SliderState = {
    pressed: false,
  }

  private styles: SliderStyles = {
    container: { backgroundColor: 'red' },
  }

  private center: Point

  private padding: number

  private container: SVGSVGElement | null

  public constructor(props: SliderProps) {
    super(props)

    this.padding = (this.props.size! - this.props.radius! * 2) / 2
    this.center = {
      x: this.props.radius! + this.padding!,
      y: this.props.radius! + this.padding!,
    }
  }

  public componentDidMount() {
    const startPosition = calculateRadialPositionFromValue(
      this.center!,
      this.props.radius! + this.props.draggableOffset!,
      this.props.value,
      this.props.minValue,
      this.props.maxValue,
    )

    this.props.onMove && this.props.onMove({ coordinates: startPosition, value: this.props.value! })
  }

  // public componentDidUpdate() {
  //   const startPosition = calculateRadialPositionFromValue(
  //     this.center!,
  //     this.props.radius! + this.props.draggableOffset!,
  //     this.props.value,
  //     this.props.minValue,
  //     this.props.maxValue,
  //   )

  //   this.props.onMove && this.props.onMove({ coordinates: startPosition, value: this.props.value! })
  // }

  public render() {
    const Draggable = this.props.draggable
    return (
      <svg
        className={this.props.className}
        width={this.props.size}
        height={this.props.size}
        viewBox={`0 0 ${this.props.size} ${this.props.size}`}
        ref={el => (this.container = el)}
        style={this.styles.container}
      >
        {this.props.children}
        <DraggableWrapper onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}>
          {Draggable}
        </DraggableWrapper>
      </svg>
    )
  }

  private moveListenerArgs = (isTouch: boolean) => ({
    moveEventType: isTouch ? 'touchmove' : 'mousemove',
    moveHandler: isTouch ? this.handleTouchMove : this.handleMouseMove,
  })

  private endListenerArgs = (isTouch: boolean) => ({
    endEventType: isTouch ? 'touchend' : 'mouseup',
    endHandler: isTouch ? this.handleTouchEnd : this.handleMouseUp,
  })

  private addEventListeners = (isTouch: boolean) => {
    this.setState({ pressed: true })
    const { moveEventType, moveHandler } = this.moveListenerArgs(isTouch)
    document.addEventListener(moveEventType, moveHandler as any)

    const { endEventType, endHandler } = this.endListenerArgs(isTouch)
    document.addEventListener(endEventType, endHandler as any)
  }

  private removeEventListeners = (isTouch: boolean) => {
    this.setState({ pressed: false })
    const { moveEventType, moveHandler } = this.moveListenerArgs(isTouch)
    document.removeEventListener(moveEventType, moveHandler as any)

    const { endEventType, endHandler } = this.endListenerArgs(isTouch)
    document.removeEventListener(endEventType, endHandler as any)
  }

  private handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
    pauseEvent(e)
    this.addEventListeners(false)
  }

  private handleTouchStart = (e: React.TouchEvent<SVGElement>) => {
    pauseEvent(e)
    this.addEventListeners(true)
  }

  private handleMouseUp = (e: React.MouseEvent<SVGElement>) => {
    pauseEvent(e)
    this.removeEventListeners(false)
  }

  private handleTouchEnd = (e: React.TouchEvent<SVGElement>) => {
    pauseEvent(e)
    this.removeEventListeners(true)
  }

  private handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    pauseEvent(e)
    const { draggableOffset, onMove, radius } = this.props
    if (!this.container || !onMove || typeof radius === 'undefined' || typeof draggableOffset === 'undefined') {
      return null
    }
    const coordinates = calculateRadialPosition(
      this.container,
      this.center,
      radius + draggableOffset,
      absoluteMousePosition(e),
    )
    const value = angleToValue(
      calculateAngleToPoint(this.container, this.center, absoluteMousePosition(e)),
      this.props.minValue!,
      this.props.maxValue!,
    )
    onMove({ coordinates, value })
  }

  private handleTouchMove = (e: React.TouchEvent<SVGElement>) => {
    pauseEvent(e)
    const { draggableOffset, onMove, radius } = this.props
    if (!this.container || !onMove || typeof radius === 'undefined' || typeof draggableOffset === 'undefined') {
      return null
    }
    const coordinates = calculateRadialPosition(
      this.container,
      this.center,
      radius + draggableOffset,
      absoluteTouchPosition(e),
    )
    const value = angleToValue(
      calculateAngleToPoint(this.container, this.center, absoluteTouchPosition(e)),
      this.props.minValue!,
      this.props.maxValue!,
    )
    onMove({ coordinates, value })
  }
}

export default CircularSlider
