import useFetch from "./hooks/useFetch";

import createDrawing from "./components/createDrawing";
import { useState, useEffect, useRef } from "react";
import useLocaleStorage from "./hooks/useLocaleStorage";

export default function App() {
  const [drawing, saveDrawing] = useLocaleStorage("drawing", null);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = createDrawing(ref.current, drawing, saveDrawing);
    return cleanup;
  }, [drawing, saveDrawing]);

  return (
    <div>
      <section>
        <header>
          <h1> Drawing App </h1>
          <button onClick={() => window.location.reload()}>Reload</button>

          <button
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Clear Drawing
          </button>
        </header>

        <figure>
          <canvas ref={ref} width={800} height={800} />
          <figcaption> Draw Anything with mouse </figcaption>
        </figure>
      </section>
    </div>
  );
}
