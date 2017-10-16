export const pauseEvent = (e: Event) => {
  e.stopPropagation()
  e.preventDefault()
}

export const absTouchPos = (e: TouchEvent) => ({
  x: e.touches[0].pageX - (window.scrollX || window.pageXOffset),
  y: e.touches[0].pageY - (window.scrollY || window.pageYOffset),
})

export const absMousePos = (e: MouseEvent) => ({
  x: e.pageX - (window.scrollX || window.pageXOffset),
  y: e.pageY - (window.scrollY || window.pageYOffset),
})
