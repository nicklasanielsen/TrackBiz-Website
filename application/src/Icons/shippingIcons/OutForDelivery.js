import * as React from "react";

function SvgOutForDelivery(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
      <circle cx={64} cy={64} fill="#f5a551" r={64} />
      <path
        d="M41 50c-2.5-.8-2.5-2.4 0-3l19-10c2.3-1.3 5.7-1.3 8 0l19 10c2.5.8 2.5 2.4 0 3L68 60c-2.3 1.3-5.7 1.3-8 0L41 50zm24 20c0-2.5 1.7-5.3 4-6l20-11c2.3-.7 4 .4 4 3v19c0 2.7-1.7 5.5-4 7L69 92c-2.3.7-4-.4-4-3V70zM37 81c-2.3-.7-4-3.4-4-6V56c0-2.5 1.7-3.6 4-3l20 10c2.3 1.6 4 4.2 4 7v19c0 2.5-1.7 3.6-4 3L37 81z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgOutForDelivery;
