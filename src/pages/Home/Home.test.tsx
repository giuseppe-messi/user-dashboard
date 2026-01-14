import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { testA11y } from "../../test/testA11y";

describe("Home page", () => {
  test("Home is accessible", async () => {
    const results = await testA11y(<Home />);
    expect(results).toHaveNoViolations();
  });
  it("renders dashboard title", () => {
    render(<Home />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
