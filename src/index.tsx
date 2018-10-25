import React from 'react'
import { Point } from './helpers/geometry'
import { boundMethods, MovementResponse, SliderProps, SliderState } from './helpers/index'

import { Arc } from './components/Arc'
import { DraggableWrapper } from './components/DraggableWrapper'

class CircularSlider extends React.PureComponent<SliderProps, SliderState> {
  public static defaultProps: SliderProps = {
    children: <Arc radius={100} padding={10} size={40} thickness={20} />,
    draggable: undefined,
    draggableOffset: 0,
    maxValue: 100,
    minValue: 0,
    motion: 'once',
    radius: 100,
    value: 0,
    size: 200,
    rotationAdjustment: -90,
  }

  private defaultStyle: React.CSSProperties = {
    position: 'relative',
  }

  private center: Point = { x: 0, y: 0 }
  private container: Element | null = null
  private coordinates: Point = { x: 0, y: 0 }
  private padding: number = 0
  private value: number = 0

  private initPosition: (this: CircularSlider, props: SliderProps) => void
  private moveListenerArgs: (this: CircularSlider, isTouch: boolean) => void
  private endListenerArgs: (this: CircularSlider, isTouch: boolean) => void
  private addEventListeners: (this: CircularSlider, isTouch: boolean) => void
  private removeEventListeners: (this: CircularSlider, isTouch: boolean) => void
  private handleMouseDown: (this: CircularSlider, e: MouseEvent) => void
  private handleTouchStart: (this: CircularSlider, e: TouchEvent) => void
  private handleMouseUp: (this: CircularSlider, e: MouseEvent) => void
  private handleTouchEnd: (this: CircularSlider, e: TouchEvent) => void
  private handleMouseMove: (this: CircularSlider, e: MouseEvent) => void
  private handleTouchMove: (this: CircularSlider, e: TouchEvent) => void
  private getMovementData: (this: CircularSlider, position: Point, pressed: boolean) => MovementResponse | null

  public constructor(props: SliderProps) {
    super(props)
    this.state = { pressed: false }

    const bound = boundMethods(this)
    this.initPosition = bound.initPosition
    this.moveListenerArgs = bound.moveListenerArgs
    this.endListenerArgs = bound.endListenerArgs
    this.addEventListeners = bound.addEventListeners
    this.removeEventListeners = bound.removeEventListeners
    this.handleMouseDown = bound.handleMouseDown
    this.handleTouchStart = bound.handleTouchStart
    this.handleMouseUp = bound.handleMouseUp
    this.handleTouchEnd = bound.handleTouchEnd
    this.handleMouseMove = bound.handleMouseMove
    this.handleTouchMove = bound.handleTouchMove
    this.getMovementData = bound.getMovementData

    this.initPosition(props)
  }

  public componentDidMount() {
    const { onMove, value = 0 } = this.props
    const { pressed } = this.state

    if (onMove) {
      onMove({ coordinates: this.coordinates, pressed, value })
    }
  }

  public render() {
    const { children, class: className, draggable, size } = this.props
    const Draggable = draggable
    return (
      <div
        className={`circular-slider ${className ? className : ''}`}
        ref={el => (this.container = el)}
        style={{ ...this.defaultStyle, width: size, height: size }}
      >
        {children}
        <DraggableWrapper onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}>
          {Draggable}
        </DraggableWrapper>
      </div>
    )
  }
}

export default { CircularSlider }
