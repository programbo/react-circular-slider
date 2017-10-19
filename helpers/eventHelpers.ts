export const pauseEvent = (e: React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>) => {
  e.stopPropagation()
  e.preventDefault()
}

export const absoluteTouchPosition = (e: React.TouchEvent<SVGElement>) => ({
  x: e.touches[0].pageX - (window.scrollX || window.pageXOffset),
  y: e.touches[0].pageY - (window.scrollY || window.pageYOffset),
})

export const absoluteMousePosition = (e: React.MouseEvent<SVGElement>) => ({
  x: e.pageX - (window.scrollX || window.pageXOffset),
  y: e.pageY - (window.scrollY || window.pageYOffset),
})
