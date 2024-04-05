"use client";
import React from "react";

const SimulateError = () => {
  const simulateError = () => {
    throw new Error("Simulated error");
  };
  return <a onClick={() => simulateError()}>Simulate Error</a>;
};

export default SimulateError;
