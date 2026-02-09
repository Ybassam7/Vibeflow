import React from "react";
import { Spinner as FlowbiteSpinner } from "flowbite-react";

export default function Spinner() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <FlowbiteSpinner aria-label="Loading page" size="xl" />
    </div>
  );
}
