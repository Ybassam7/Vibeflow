import React from "react";

function Alert({ error }) {
  return <p className="text-sm pt-1 text-red-700 min-h-4">{error}</p>;
}

export default Alert;
