import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

const renderComponent = (props = {}) => render(<LoadingSpinner {...props} />);

describe("LoadingSpinner component", () => {
  it("should render with default props", () => {
    renderComponent();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should render with fullScreen prop", () => {
    renderComponent({ fullScreen: true });
    const spinner = screen.getByRole("status");
    const parent = spinner.parentElement;

    expect(parent).toHaveStyle({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    });
  });
});
