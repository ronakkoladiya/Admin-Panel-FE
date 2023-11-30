import React from "react";

const Addicon = ({width='50px',height='50px'}) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 62 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.1" cx="31" cy="31" r="31" fill="#000981" />
        <mask
          id="mask0_1253_630"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="11"
          y="11"
          width="40"
          height="40"
        >
          <rect
            x="11.3652"
            y="11.3672"
            width="39.2667"
            height="39.2667"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_1253_630)">
          <path
            d="M29.3616 42.4524V32.6358H19.5449V29.3635H29.3616V19.5469H32.6338V29.3635H42.4505V32.6358H32.6338V42.4524H29.3616Z"
            fill="#000981"
          />
        </g>
      </svg>
    </>
  );
};

export default Addicon;
