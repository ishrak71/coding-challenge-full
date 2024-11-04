import Header from "./components/Header";
import React from "react";
import { render } from "@testing-library/react";

test("renders app header", () => {
  const { getByText } = render(<Header user={null} />);
  const headerText = getByText("Analytics Dashboard");
  expect(headerText).toBeInTheDocument();
});

test("renders user name", () => {
  const { getByText } = render(<Header user={null} />);
  const headerText = getByText("Welcome, Guest!");
  expect(headerText).toBeInTheDocument();
});
