import * as React from 'react'

export interface CircularSliderProps {
  endAngle: number
  height: number
  motion: 'loop' | 'infinite' | 'once'
  onMove: (value: number) => void
  onMoveEnd: (value: number) => void
  radius: number
  startAngle: number
  value: number
  width: number
}

class CircularSlider extends React.Component<CircularSliderProps, {}> {
  public static defaultProps = {}
  render() {
    return <div />
  }
}

export default CircularSlider
