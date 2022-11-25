import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "../pages/Login/Login";
import App from "../App";
import "@testing-library/jest-dom";

describe("Login", () => {
  beforeEach(() => {
    window.history.replaceState(window.history.state, "", "/");
  });

  it("Renderizou a página de inicio", () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
  });

  it("Deu email invalido com a validação", () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "asdasda" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText("Email ou senha em formato incorreto.")
    ).toBeInTheDocument();
  });

  it("Deu senha invalido com a validação", () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    fireEvent.change(screen.getByLabelText("Senha:"), {
      target: { value: "asdasda" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText("Email ou senha em formato incorreto.")
    ).toBeInTheDocument();
  });

  it("Credenciais que não batem", async () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "brayanwilis123@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha:"), {
      target: { value: "Brayanwilis123" },
    });
    fireEvent.click(screen.getByText("Entrar"), App);
    await waitFor(() =>
      expect(
        screen.getByText("Usuário ou senha incorretos.")
      ).toBeInTheDocument()
    );
  });
});
