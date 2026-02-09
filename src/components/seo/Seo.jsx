import React from "react";
import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
  const defaultDescription = "Connect and share on Vibeflow";

  return (
    <Helmet>
      <title>Vibeflow | {title}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}
