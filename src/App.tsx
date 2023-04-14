import React from "react";
import RippleBox from "daler-ripple-box";

function App() {
  return (
    <div className="App">
      <RippleBox rippleColor="rgba(0, 0, 0, 0.1)">
        {(ref, contentRef) => (
          <button ref={ref} className="button">
            <span ref={contentRef}>Hello world 2</span>
          </button>
        )}
      </RippleBox>
    </div>
  );
}

export default App;
