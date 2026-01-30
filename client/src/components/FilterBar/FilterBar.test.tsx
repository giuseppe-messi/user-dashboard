import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar, FilterBarProps } from "./FilterBar";
import * as useUserRolesHook from "../../hooks/useUserRoles";

const mockOnRoleFilters = vi.fn();

const defaultProps: FilterBarProps = {
  activeRoles: ["ADMIN"],
  onRoleFilters: mockOnRoleFilters
};

const renderComponent = (props: FilterBarProps = defaultProps) =>
  render(<FilterBar {...props} />);

describe("FilterBar component", () => {
  it("should render badges and toggle role when clicked", async () => {
    vi.spyOn(useUserRolesHook, "useUserRoles").mockReturnValue({
      roles: ["ADMIN", "EDITOR"],
      loading: false,
      error: null
    });

    const user = userEvent.setup();
    renderComponent();

    const adminButton = screen.getByRole("button", { name: "ADMIN" });
    expect(adminButton).toBeInTheDocument();

    await user.click(adminButton);

    expect(mockOnRoleFilters).toHaveBeenCalledWith([]);
  });

  it("should render loading spinner when loading", () => {
    vi.spyOn(useUserRolesHook, "useUserRoles").mockReturnValue({
      roles: [],
      loading: true,
      error: null
    });

    renderComponent();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should render error message when error occurs", () => {
    vi.spyOn(useUserRolesHook, "useUserRoles").mockReturnValue({
      roles: [],
      loading: false,
      error: new Error("Boom")
    });

    renderComponent();

    expect(screen.getByText("Error loading filters")).toBeInTheDocument();
  });
});
