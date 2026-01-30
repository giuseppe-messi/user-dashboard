import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination, PaginationProps } from "./Pagination";

const mockOnPrevPage = vi.fn();
const mockOnNextPage = vi.fn();

const defaultProps: PaginationProps = {
  currentPage: 2,
  totalPages: 5,
  onPrevPage: mockOnPrevPage,
  onNextPage: mockOnNextPage
};

const renderComponent = (props: PaginationProps = defaultProps) =>
  render(<Pagination {...props} />);

describe("Pagination component", () => {
  beforeEach(() => {
    mockOnPrevPage.mockClear();
    mockOnNextPage.mockClear();
  });

  it("should render and handle button clicks", async () => {
    const user = userEvent.setup();
    renderComponent();

    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();

    await user.click(screen.getByText("Prev"));
    expect(mockOnPrevPage).toHaveBeenCalled();

    await user.click(screen.getByText("Next"));
    expect(mockOnNextPage).toHaveBeenCalled();
  });

  it("should disable buttons at boundaries", () => {
    const { rerender } = renderComponent({ ...defaultProps, currentPage: 1 });
    expect(screen.getByText("Prev")).toBeDisabled();

    rerender(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
