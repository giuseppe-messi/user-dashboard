import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import App from "./App";

const renderComponent = () => render(<App />);

describe("App component", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/");
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    const { container } = renderComponent();
    expect(container).toBeTruthy();
  });

  it("renders NotFound on unknown route", async () => {
    window.history.pushState({}, "", "/unknown");

    renderComponent();

    expect(
      await screen.findByText(/we can’t find that page/i)
    ).toBeInTheDocument();
  });

  it("renders ErrorPage when a route crashes", async () => {
    const Boom = () => {
      throw new Error("Boom");
    };

    vi.doMock("./routes", () => ({
      routes: [{ path: "/", Component: Boom }]
    }));

    const { default: App } = await import("./App");

    render(<App />);

    expect(screen.getByText(/Something is not right!/i)).toBeInTheDocument();
  });

  it("resets error state when reset is triggered", async () => {
    let shouldCrash = true;

    const Boom = () => {
      if (shouldCrash) throw new Error("Boom");
      return <div>Recovered</div>;
    };

    vi.doMock("./routes", () => ({
      routes: [{ path: "/", Component: Boom }]
    }));

    const { default: App } = await import("./App");

    render(<App />);

    // error page visible
    expect(screen.getByText(/Something is not right!/i)).toBeInTheDocument();

    // simulate user recovery
    shouldCrash = false;

    fireEvent.click(screen.getByRole("button"));

    // app successfully re-renders
    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
