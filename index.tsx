import * as React from 'react'

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

  render() {
    const Draggable = this.props.draggable
    return (
      <svg className={this.props.className} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        {this.props.children}
        <DefaultRing padding={10} radius={90} thickness={20} />
        <DefaultDraggable size={40} />
      </svg>
    )
  }
}

export default CircularSlider
