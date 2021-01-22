const singleIterationSteps = 200;

export interface LineState {
  svg: SVGElement;
  bars: SVGRectElement[];
  animationReadyHandle?: number;
  realBarWidth: number;
  barGap: number;
  step: number;
  parentTop: number;
  parentHeight: number;
  amount: number;
}

function triggerAnimate(state: LineState) {
  if (!state.animationReadyHandle) {
    state.animationReadyHandle = window.requestAnimationFrame(t =>
      animateBars(state, t)
    );
  }
}
function animateBars(state: LineState, time: number) {
  state.animationReadyHandle = undefined;
  const { step, bars, barGap, realBarWidth, amount } = state;

  const barCount = bars.length;
  let left = 0;
  const currentBarWidth = realBarWidth * amount;
  const currentBarGap = barGap * amount;
  const iBarWidth = Math.floor(currentBarWidth);
  for (let i = 0; i < barCount; i++) {
    const rect = bars[i];
    const x = left;
    rect.setAttributeNS(null, "x", x + "");
    rect.setAttributeNS(null, "width", iBarWidth + "");
    left += currentBarWidth + currentBarGap;
  }

  const next = step + 1;
  if (next === singleIterationSteps) {
    state.step = 0;
  } else {
    state.step = next;
  }
}

export function createAnimatingBars(
  svg: SVGElement,
  barWidth = 10,
  barGap = 10
) {
  const width = Math.floor(svg.clientWidth);

  const barCount = Math.floor((width + barGap) / (barWidth + barGap));
  const spaceForBars = width - barGap * (barCount - 1);
  const realBarWidth = Math.floor(spaceForBars / barCount);

  const parent = svg.parentElement!;
  const { clientTop: parentTop, clientHeight: parentHeight } = parent;

  console.log(
    "width",
    width,
    "barCount",
    barCount,
    "spaceForBars",
    spaceForBars,
    "realBarWidth",
    realBarWidth,
    "parent",
    parentTop,
    parentHeight
  );

  let left = 0;

  const bars: SVGRectElement[] = [];

  for (let i = 0; i < barCount; i++) {
    const x = left;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttributeNS(null, "x", x + "");
    rect.setAttributeNS(null, "y", "0");
    rect.setAttributeNS(null, "width", realBarWidth + "");
    rect.setAttributeNS(null, "height", "50");
    rect.setAttributeNS(null, "fill", "red");
    svg.appendChild(rect);

    bars.push(rect);
    left += realBarWidth + barGap;
  }

  const state: LineState = {
    svg,
    bars,
    step: 0,
    realBarWidth,
    barGap,
    parentTop,
    parentHeight,
    amount: 0,
  };
  return state;
}

export function destroyAnimatingBars(state: LineState) {
  const handle = state.animationReadyHandle;
  if (handle) {
    window.cancelAnimationFrame(handle);
    state.animationReadyHandle = undefined;
  }
}

export function adjustAmount(state: LineState, position: number) {
  const { parentTop, parentHeight, amount: originalAmount } = state;
  const parentBottom = parentTop + parentHeight;
  let newAmount: number;
  if (position < parentTop) {
    newAmount = 0;
  } else if (position >= parentBottom) {
    newAmount = 1;
  } else {
    const amount = position - parentTop;
    newAmount = amount / parentHeight;
  }

  if (newAmount !== originalAmount) {
    state.amount = newAmount;
    triggerAnimate(state);
  }
}
