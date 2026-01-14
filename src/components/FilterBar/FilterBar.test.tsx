import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar, FilterBarProps } from "./FilterBar";

const mockOnFilterByTag = vi.fn();

const defaultProps: FilterBarProps = {
  activeRole: null,
  onFilterByTag: mockOnFilterByTag
};

const renderComponent = (props: FilterBarProps = defaultProps) =>
  render(<FilterBar {...props} />);

describe("FilterBar component", () => {
  it("should render all badges and call onFilterByTag when clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    expect(screen.getByText("ADMIN")).toBeInTheDocument();

    await user.click(screen.getByText("ADMIN"));
    expect(mockOnFilterByTag).toHaveBeenCalledWith("admin");
  });
});
