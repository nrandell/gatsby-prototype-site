import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  adjustAmount,
  createAnimatingBars,
  destroyAnimatingBars,
  LineState,
} from "../components/AnimatingBars";

interface Props {}

const PollyexAnimation: React.FC<Props> = ({}) => {
  const animatingStateRef = useRef<LineState>(null);

  const svgRef = useCallback((svg: SVGElement | null) => {
    if (!svg) {
      const animatingState = animatingStateRef.current;
      if (animatingState) {
        destroyAnimatingBars(animatingState);
      }
    } else {
      const animatingState = createAnimatingBars(svg);
      (animatingStateRef as MutableRefObject<LineState>).current = animatingState;
    }
  }, []);

  useEffect(() => {
    const handleScroll = (ev: Event) => {
      const position = window.scrollY;
      const state = animatingStateRef.current;
      if (state) {
        adjustAmount(state, position);
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <div>
      <h1>Animation example</h1>
      <div className="w-0 h-screens bg-red">
        <svg className="fixed w-full h-1/4" ref={svgRef} />
      </div>
    </div>
  );
};

export default PollyexAnimation;
