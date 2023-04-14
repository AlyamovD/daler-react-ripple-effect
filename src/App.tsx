import React from "react";
import RippleBox from "./ripple-box";

function App() {
  return (
    <div className="App">
      <RippleBox>
        {(ref) => (
          <button ref={ref} className="button">
            Hello world
          </button>
        )}
      </RippleBox>
      <RippleBox>
        {(ref) => (
          <button ref={ref} className="button">
            Hello world 2
          </button>
        )}
      </RippleBox>
    </div>
  );
}

export default App;
