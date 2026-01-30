import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserGrid, UserGridProps } from "./UserGrid";
import { mockUser } from "../../test/mocks/sharedMocks";

const mockOnViewDetails = vi.fn();

const defaultProps: UserGridProps = {
  users: [mockUser],
  onViewDetails: mockOnViewDetails
};

const renderComponent = (props: UserGridProps = defaultProps) =>
  render(<UserGrid {...props} />);

describe("UserGrid component", () => {
  beforeEach(() => {
    mockOnViewDetails.mockClear();
  });

  it("should render user cards", () => {
    renderComponent();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("should call onViewDetails with user when View details button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("View details"));
    expect(mockOnViewDetails).toHaveBeenCalledWith(0);
  });

  it("should render multiple users", () => {
    const user2 = { ...mockUser, email: "jane@example.com", firstName: "Jane" };
    renderComponent({ ...defaultProps, users: [mockUser, user2] });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
