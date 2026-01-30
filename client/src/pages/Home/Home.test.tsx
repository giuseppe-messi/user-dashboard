import { describe, it, expect, vi, Mock } from "vitest";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor
} from "@testing-library/react";
import Home from "./Home";
import { useUsers } from "../../hooks/useUsers";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useUserDetailsModal } from "../../hooks/useUserDetailsModal";
import { usePostUser } from "../../hooks/usePostUser";
import { useCreateUserModal } from "../../hooks/useCreateUserModal";
import {
  createUseUsersMock,
  createuseUserDetailsModalMock,
  mockUser
} from "../../test/mocks/sharedMocks";

vi.mock("../../hooks/useUsers");
vi.mock("../../hooks/useUserDetailsModal");
vi.mock("../../hooks/useUpdateUser");
vi.mock("../../hooks/useDeleteUser");
vi.mock("../../hooks/usePostUser");
vi.mock("../../hooks/useCreateUserModal");

vi.mock(
  "../../components/UserDetailsModalWrapper/UserDetailsModalWrapper",
  () => ({
    UserDetailsModalWrapper: (props: {
      onSaveUser: (user: unknown) => void;
      onDeleteUser: (id: string) => void;
      onNextUser: () => void;
      onPrevUser: () => void;
    }) => (
      <div>
        <button onClick={() => props.onSaveUser(mockUser)}>save</button>
        <button onClick={() => props.onDeleteUser(mockUser.id)}>delete</button>
        <button onClick={props.onNextUser}>next</button>
        <button onClick={props.onPrevUser}>prev</button>
      </div>
    )
  })
);

vi.mock("../../components/CreateUserModal/CreateUserModal", () => ({
  CreateUserModal: (props: {
    onCreateUser: (user: unknown) => void;
    onCancel: () => void;
  }) => (
    <div>
      <button onClick={() => props.onCreateUser(mockUser)}>create</button>
      <button onClick={props.onCancel}>cancel</button>
    </div>
  )
}));

const setup = (overrides?: {
  users?: ReturnType<typeof createUseUsersMock>;
  modal?: ReturnType<typeof createuseUserDetailsModalMock>;
}) => {
  const users = overrides?.users ?? createUseUsersMock();
  const modal = overrides?.modal ?? createuseUserDetailsModalMock();

  (useUsers as Mock).mockReturnValue(users);
  (useUserDetailsModal as Mock).mockReturnValue(modal);

  (useUpdateUser as Mock).mockReturnValue({
    updateUser: vi.fn(),
    loading: false
  });

  (useDeleteUser as Mock).mockReturnValue({
    deleteUser: vi.fn(),
    loading: false
  });

  (usePostUser as Mock).mockReturnValue({
    createUser: vi.fn(),
    loading: false
  });

  (useCreateUserModal as Mock).mockReturnValue({
    isOpen: false,
    openModal: vi.fn(),
    closeModal: vi.fn()
  });

  return { users, modal };
};

describe("Home", () => {
  it("shows no results message", () => {
    const users = createUseUsersMock();
    users.hasSearchedOnce = true;
    users.users = [];

    setup({ users });

    render(<Home />);

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it("renders users grid when results exist", () => {
    const users = createUseUsersMock();
    users.hasSearchedOnce = true;
    users.users = [mockUser];

    setup({ users });

    render(<Home />);

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it("renders modal content when open", () => {
    const users = createUseUsersMock();
    users.users = [mockUser];

    const modal = createuseUserDetailsModalMock();
    modal.isOpen = true;
    modal.selectedUserIndex = 0;

    setup({ users, modal });

    render(<Home />);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/save/i)).toBeInTheDocument();
  });

  it("calls updateUser and fetchUsers when saving", async () => {
    const users = createUseUsersMock();
    users.users = [mockUser];

    const modal = createuseUserDetailsModalMock();
    modal.isOpen = true;
    modal.selectedUserIndex = 0;

    const updateUser = vi.fn();

    setup({ users, modal });
    (useUpdateUser as Mock).mockReturnValue({ updateUser, loading: false });

    render(<Home />);

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalled();
      expect(users.fetchUsers).toHaveBeenCalled();
    });
  });

  it("calls deleteUser and fetchUsers when deleting", async () => {
    const users = createUseUsersMock();
    users.users = [mockUser];

    const modal = createuseUserDetailsModalMock();
    modal.isOpen = true;
    modal.selectedUserIndex = 0;

    const deleteUser = vi.fn();

    setup({ users, modal });
    (useDeleteUser as Mock).mockReturnValue({ deleteUser, loading: false });

    render(<Home />);

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalled();
      expect(users.fetchUsers).toHaveBeenCalled();
    });
  });

  it("opens next user in modal", () => {
    const users = createUseUsersMock();
    users.users = [mockUser, mockUser];

    const modal = createuseUserDetailsModalMock();
    modal.isOpen = true;
    modal.selectedUserIndex = 0;

    setup({ users, modal });

    render(<Home />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByText(/next/i));

    expect(modal.openModal).toHaveBeenCalledWith(1);
  });

  it("opens previous user in modal", () => {
    const users = createUseUsersMock();
    users.users = [mockUser, mockUser];

    const modal = createuseUserDetailsModalMock();
    modal.isOpen = true;
    modal.selectedUserIndex = 1;

    setup({ users, modal });

    render(<Home />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByText(/prev/i));

    expect(modal.openModal).toHaveBeenCalledWith(0);
  });

  it("calls createUser and fetchUsers when creating user", async () => {
    const users = createUseUsersMock();
    users.users = [mockUser];

    const createUser = vi.fn();

    setup({ users });

    (usePostUser as Mock).mockReturnValue({ createUser, loading: false });
    (useCreateUserModal as Mock).mockReturnValue({
      isOpen: true,
      openModal: vi.fn(),
      closeModal: vi.fn()
    });

    render(<Home />);

    fireEvent.click(screen.getByText(/create/i));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith(mockUser);
      expect(users.fetchUsers).toHaveBeenCalled();
    });
  });
});
