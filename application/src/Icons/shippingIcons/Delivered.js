import * as React from "react";

function SvgDelivered(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
      <path
        d="M64 128c35.3 0 64-28.7 64-64S99.3 0 64 0 0 28.7 0 64s28.7 64 64 64z"
        fill="#4cbb87"
      />
      <path
        d="M82.5 53.2l-3.4-3.4c-.5-.5-1-.7-1.7-.7s-1.2.2-1.7.7L59.5 66.3l-7.3-7.4c-.5-.5-1-.7-1.7-.7s-1.2.2-1.7.7l-3.4 3.4c-.5.5-.7 1-.7 1.7s.2 1.2.7 1.7l9 9.1 3.4 3.4c.5.5 1 .7 1.7.7s1.2-.2 1.7-.7l3.4-3.4 17.9-18.2c.5-.5.7-1 .7-1.7s-.2-1.2-.7-1.7z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgDelivered;
