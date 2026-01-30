import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCard, UserCardProps } from "./UserCard";
import { mockUser } from "../../test/mocks/sharedMocks";

const mockOnViewDetails = vi.fn();

const defaultProps: UserCardProps = {
  user: mockUser,
  onViewDetails: mockOnViewDetails
};

const renderComponent = (props: UserCardProps = defaultProps) =>
  render(<UserCard {...props} />);

describe("UserCard component", () => {
  beforeEach(() => {
    mockOnViewDetails.mockClear();
  });

  it("should render user information", () => {
    renderComponent();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("should call onViewDetails when View details button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("View details"));
    expect(mockOnViewDetails).toHaveBeenCalled();
  });
});
