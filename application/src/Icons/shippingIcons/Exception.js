import * as React from "react";

function SvgException(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
      <path
        d="M64 128c35.3 0 64-28.7 64-64S99.3 0 64 0 0 28.7 0 64s28.7 64 64 64z"
        fill="#d26759"
      />
      <path
        d="M59.7 37.3c0-.6.4-1 1-1h6.5c.5 0 1 .4 1 1v36.4c0 .6-.4 1-1 1h-6.5c-.5 0-1-.4-1-1V37.3zm0 46.9c0-.6.4-1 1-1h6.5c.5 0 1 .4 1 1v6.7c0 .6-.4 1-1 1h-6.5c-.5 0-1-.4-1-1v-6.7z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgException;
