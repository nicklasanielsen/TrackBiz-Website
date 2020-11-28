import * as React from "react";

function SvgInTransit(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
      <path
        d="M64 128c35.3 0 64-28.7 64-64S99.3 0 64 0 0 28.7 0 64s28.7 64 64 64z"
        fill="#65aee0"
      />
      <path
        d="M75 81H55v-.5C55 74.7 50.3 70 44.5 70c-5.6 0-10.2 4.4-10.5 10h-4V63.1L44.6 44H53V34h47v47h-4v-.5C96 74.7 91.3 70 85.5 70S75 74.7 75 80.5v.5zM38 62h8V51l-8 11zm47.5 27c4.7 0 8.5-3.8 8.5-8.5S90.2 72 85.5 72 77 75.8 77 80.5s3.8 8.5 8.5 8.5zm-41 0c4.7 0 8.5-3.8 8.5-8.5S49.2 72 44.5 72 36 75.8 36 80.5s3.8 8.5 8.5 8.5z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgInTransit;
