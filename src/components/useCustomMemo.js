import React, { useRef } from "react";

export default function useCustomMemo(cb, dependecyArr) {
  const ref = useRef({
    memoizedValue: undefined,
    lastDependency: undefined,
  });

  if (
    !ref.current.memoizedValue ||
    !areArraysEqual(ref.current.lastDependency, dependecyArr)
  ) {
    ref.current.memoizedValue = cb();
  }

  return ref.current.memoizedValue;
}

function areArraysEqual(prev, curr) {
  if (!prev || !curr || prev.length !== curr.length) {
    return false;
  }

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] != curr[i]) {
      return false;
    }
  }

  return true;
}
