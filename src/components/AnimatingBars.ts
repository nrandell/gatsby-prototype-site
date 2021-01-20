const singleIterationSteps = 200

interface LineState {
  svg: SVGElement
  bars: SVGRectElement[]
  animationReadyHandle?: number
  realBarWidth: number
  barGap: number
  step: number
}

function animateBars(state: LineState, time: number) {
  const { step, bars, barGap, realBarWidth } = state

  const proportion = step / singleIterationSteps
  const barCount = bars.length
  let left = 0
  const currentBarWidth = realBarWidth * proportion
  const currentBarGap = barGap * proportion
  const iBarWidth = Math.floor(currentBarWidth)
  for (let i = 0; i < barCount; i++) {
    const rect = bars[i]
    const x = left
    rect.setAttributeNS(null, "x", x + "")
    rect.setAttributeNS(null, "width", iBarWidth + "")
    left += currentBarWidth + currentBarGap
  }

  const next = step + 1
  if (next === singleIterationSteps) {
    state.step = 0
  } else {
    state.step = next
  }

  state.animationReadyHandle = window.requestAnimationFrame(x =>
    animateBars(state, x)
  )
}

export function createAnimatingBars(
  svg: SVGElement,
  barWidth = 10,
  barGap = 10
) {
  const width = Math.floor(svg.clientWidth)

  const barCount = Math.floor((width + barGap) / (barWidth + barGap))
  const spaceForBars = width - barGap * (barCount - 1)
  const realBarWidth = Math.floor(spaceForBars / barCount)

  console.log(
    "width",
    width,
    "barCount",
    barCount,
    "spaceForBars",
    spaceForBars,
    "realBarWidth",
    realBarWidth
  )

  let left = 0

  const bars: SVGRectElement[] = []

  for (let i = 0; i < barCount; i++) {
    const x = left

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttributeNS(null, "x", x + "")
    rect.setAttributeNS(null, "y", "0")
    rect.setAttributeNS(null, "width", realBarWidth + "")
    rect.setAttributeNS(null, "height", "50")
    rect.setAttributeNS(null, "fill", "red")
    svg.appendChild(rect)

    bars.push(rect)
    left += realBarWidth + barGap
  }

  const state: LineState = { svg, bars, step: 0, realBarWidth, barGap }
  state.animationReadyHandle = window.requestAnimationFrame(x =>
    animateBars(state, x)
  )
  return state
}

export function destroyAnimatingBars(state: LineState) {
  const handle = state.animationReadyHandle
  if (handle) {
    window.cancelAnimationFrame(handle)
    state.animationReadyHandle = undefined
  }
}
