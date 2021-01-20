import React, { useCallback, useRef } from "react"
import { createAnimatingBars } from "../components/AnimatingBars"

interface Props {}

const PollyexAnimation: React.FC<Props> = ({}) => {
  const svgRef = useCallback((svg: SVGElement) => {
    createAnimatingBars(svg)
  }, [])

  return (
    <div>
      <h1>Animation example</h1>
      <svg ref={svgRef} />
    </div>
  )
}

export default PollyexAnimation
