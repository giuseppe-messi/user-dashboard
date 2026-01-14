import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home page", () => {
  it("renders dashboard title", () => {
    render(<Home />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
