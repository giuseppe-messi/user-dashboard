import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar, SearchBarProps } from "./SearchBar";

const mockOnSearch = vi.fn();
const mockOnResetFetch = vi.fn();

const defaultProps: SearchBarProps = {
  onSearch: mockOnSearch,
  onResetFetch: mockOnResetFetch
};

const renderComponent = (props: SearchBarProps = defaultProps) =>
  render(<SearchBar {...props} />);

describe("SearchBar component", () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnResetFetch.mockClear();
  });

  it("should call onSearch with input value when Search button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const input = screen.getByPlaceholderText("Search by name...");
    await user.type(input, "John");
    await user.click(screen.getByText("Search"));

    expect(mockOnSearch).toHaveBeenCalledWith("John");
  });

  it("should call onResetFetch when empty search is submitted", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Search"));

    expect(mockOnResetFetch).toHaveBeenCalled();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("should call onSearch when Enter key is pressed", async () => {
    const user = userEvent.setup();
    renderComponent();

    const input = screen.getByPlaceholderText("Search by name...");
    await user.type(input, "Jane{Enter}");

    expect(mockOnSearch).toHaveBeenCalledWith("Jane");
  });
});
