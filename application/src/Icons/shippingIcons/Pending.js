import * as React from "react";

function SvgPending(props) {
  return (
    <svg
      id="pending_svg__Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      viewBox="0 0 128 128"
      xmlSpace="preserve"
      {...props}
    >
      <style>{".pending_svg__st0{fill:#ccc}"}</style>
      <g id="pending_svg__Status">
        <g id="pending_svg__Pending">
          <g id="pending_svg__Group-11">
            <circle
              id="pending_svg__Oval-7-Copy-4"
              className="pending_svg__st0"
              cx={64}
              cy={64}
              r={64}
            />
            <g id="pending_svg__Group-8" transform="translate(34 34)">
              <path
                id="pending_svg__Oval-7-Copy-2"
                d="M30 60c16.6 0 30-13.4 30-30S46.6 0 30 0 0 13.4 0 30s13.4 30 30 30z"
                fill="#fff"
              />
            </g>
          </g>
        </g>
      </g>
      <path className="pending_svg__st0" d="M66 62V45h-4v21.3h17.1V62z" />
    </svg>
  );
}

export default SvgPending;
