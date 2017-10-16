import { arc } from 'd3-shape'
import * as React from 'react'

export interface DefaultRingProps {
  padding: number
  radius: number
  thickness: number
}

const DefaultRing = ({ padding = 10, radius = 80, thickness = 20 }: DefaultRingProps): JSX.Element => {
  const innerRadius = radius - thickness
  const outerRadius = radius
  const arcData = arc()({
    innerRadius: radius - thickness,
    outerRadius: radius,
    startAngle: 0,
    endAngle: Math.PI * 2,
    padAngle: 0,
  })
  return <path d={arcData!} transform={`translate(${padding} ${padding})`} />
}

export default DefaultRing
