import React from "react";

export default function Toolbox() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Use this for help</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://docs.google.com/presentation/d/1Cb-amO1lWNJkYqPNd6E-tbELLAaETtE3aRagHAoIr_4/edit?usp=sharing"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}