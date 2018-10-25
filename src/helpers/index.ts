import { absoluteMousePosition, absoluteTouchPosition } from './events'
import {
  angleToValue,
  calculateAngleBetweenPoints,
  calculateRadialPosition,
  calculateRadialPositionFromValue,
  Point,
} from './geometry'

export interface MovementResponse {
  coordinates: Point
  value: number
  pressed: boolean
}
export interface SliderProps {
  children?: any | any[]
  class?: string
  draggable?: any
  draggableOffset?: number
  maxValue?: number
  minValue?: number
  motion?: 'loop' | 'infinite' | 'once'
  onMove?: (response: MovementResponse) => void
  onMoveEnd?: (response: MovementResponse) => void
  radius?: number
  defaultValue?: number
  value?: number
  size?: number
  rotationAdjustment?: number
}

export interface SliderState {
  pressed: boolean
}

export const boundMethods = (self: any) => ({
  initPosition: initPosition.bind(self),
  moveListenerArgs: moveListenerArgs.bind(self),
  endListenerArgs: endListenerArgs.bind(self),
  addEventListeners: addEventListeners.bind(self),
  removeEventListeners: removeEventListeners.bind(self),
  handleMouseDown: handleMouseDown.bind(self),
  handleTouchStart: handleTouchStart.bind(self),
  handleMouseUp: handleMouseUp.bind(self),
  handleTouchEnd: handleTouchEnd.bind(self),
  handleMouseMove: handleMouseMove.bind(self),
  handleTouchMove: handleTouchMove.bind(self),
  getMovementData: getMovementData.bind(self),
})

function initPosition(
  this: any,
  { size, radius, maxValue, minValue, value, defaultValue, rotationAdjustment, draggableOffset }: SliderProps,
) {
  this.padding = (size! - radius! * 2) / 2
  this.center = {
    x: radius! + this.padding!,
    y: radius! + this.padding!,
  }
  this.value = value || defaultValue || 0
  this.coordinates = calculateRadialPositionFromValue(
    this.center!,
    radius! + draggableOffset!,
    this.value,
    minValue,
    maxValue,
    rotationAdjustment,
  )
}

function moveListenerArgs(this: any, isTouch: boolean) {
  return {
    moveEventType: isTouch ? 'touchmove' : 'mousemove',
    moveHandler: isTouch ? this.handleTouchMove : this.handleMouseMove,
  }
}

function endListenerArgs(this: any, isTouch: boolean) {
  return {
    endEventType: isTouch ? 'touchend' : 'mouseup',
    endHandler: isTouch ? this.handleTouchEnd : this.handleMouseUp,
  }
}

function addEventListeners(this: any, isTouch: boolean) {
  this.setState({ pressed: true })
  const { moveEventType, moveHandler } = this.moveListenerArgs(isTouch)
  document.addEventListener(moveEventType, moveHandler as any)

  const { endEventType, endHandler } = this.endListenerArgs(isTouch)
  document.addEventListener(endEventType, endHandler as any)
}

function removeEventListeners(this: any, isTouch: boolean) {
  this.setState({ pressed: false })
  const { moveEventType, moveHandler } = this.moveListenerArgs(isTouch)
  document.removeEventListener(moveEventType, moveHandler as any)

  const { endEventType, endHandler } = this.endListenerArgs(isTouch)
  document.removeEventListener(endEventType, endHandler as any)
}

function handleMouseDown(this: any, e: MouseEvent) {
  e.stopPropagation()
  this.addEventListeners(false)

  const { onMove } = this.props
  if (onMove) {
    onMove(this.getMovementData(absoluteMousePosition(e), true)!)
  }
}

function handleTouchStart(this: any, e: TouchEvent) {
  e.preventDefault()
  e.stopPropagation()
  this.addEventListeners(true)

  const { onMove } = this.props
  if (onMove) {
    onMove(this.getMovementData(absoluteTouchPosition(e), true)!)
  }
}

function handleMouseUp(this: any, e: MouseEvent) {
  e.stopPropagation()
  this.removeEventListeners(false)

  const { onMoveEnd } = this.props
  if (onMoveEnd) {
    onMoveEnd(this.getMovementData(absoluteMousePosition(e), false)!)
  }
}

function handleTouchEnd(this: any, e: TouchEvent) {
  e.stopPropagation()
  this.removeEventListeners(true)

  const { onMoveEnd } = this.props
  if (onMoveEnd) {
    onMoveEnd(this.getMovementData(absoluteTouchPosition(e), false)!)
  }
}

function handleMouseMove(this: any, e: MouseEvent) {
  e.stopPropagation()
  const { onMove } = this.props
  if (onMove) {
    onMove(this.getMovementData(absoluteMousePosition(e), true)!)
  }
}

function handleTouchMove(this: any, e: TouchEvent) {
  e.stopPropagation()
  const { onMove } = this.props
  if (onMove) {
    onMove(this.getMovementData(absoluteTouchPosition(e), true)!)
  }
}

function getMovementData(this: any, position: Point, pressed: boolean = false): MovementResponse | null {
  const { draggableOffset, maxValue, minValue, motion, onMove, radius } = this.props
  if (!this.container || !onMove || typeof radius === 'undefined' || typeof draggableOffset === 'undefined') {
    return null
  }
  const coordinates = calculateRadialPosition(this.container, this.center, radius + draggableOffset, position)

  if (this.coordinates) {
    const angleInRadians = calculateAngleBetweenPoints(this.center, this.coordinates, coordinates)
    const value = this.value + angleToValue(angleInRadians, minValue!, maxValue!)
    if (motion === 'infinite' || (value >= minValue! && value < maxValue!)) {
      this.value = value
      this.coordinates = coordinates
    } else if (motion === 'loop') {
      this.value = (value + maxValue!) % maxValue!
      this.coordinates = coordinates
    }
  } else {
    this.coordinates = coordinates
  }

  return { coordinates: this.coordinates, value: this.value, pressed }
}
