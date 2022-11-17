import React from "react";

const emojis = "";
const text = "DixonMusic!";

function BrandText() {
  return (
    <>
      {emojis}
      <div className="brand-text">{text}</div>
      {[...emojis].reverse().join("")}
    </>
  );
}

export default BrandText;
