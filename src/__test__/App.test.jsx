import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  beforeEach(() => {
    window.history.replaceState(window.history.state, "", "/");
  });
  it("Renderizou a página de inicio", () => {
    window.history.replaceState({}, "", "/");
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
  });
  it("Deu email invalido com a validação", () => {
    window.history.replaceState({}, "", "/");
    render(<App />, { wrapper: BrowserRouter });
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
    render(<App />, { wrapper: BrowserRouter });
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
    render(<App />, { wrapper: BrowserRouter });
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

describe("Main", () => {
  beforeEach(() => {
    window.history.replaceState(window.history.state, "", "/");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
  });
  it("Redirecionou para o login", () => {
    window.history.replaceState({}, "", "/");
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("Não redireciona contanto que esteja com token", () => {
    window.history.replaceState({}, "", "/");
    window.localStorage.setItem(
      "token",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTU5NjU5MCwiaWF0IjoxNjY5MzM3MzkwfQ.j47olYr5mUair_W4QlQt1CkrTUP52Tjp9y-mLzTy4cc"
      )
    );
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText("Email:")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).not.toBeInTheDocument();
    expect(screen.getByText("Entrar")).not.toBeInTheDocument();
  });
  it("Redireciona para a consulta", () => {
    window.history.replaceState({}, "", "/");
    window.localStorage.setItem(
      "token",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTU5NjU5MCwiaWF0IjoxNjY5MzM3MzkwfQ.j47olYr5mUair_W4QlQt1CkrTUP52Tjp9y-mLzTy4cc"
      )
    );
    render(<App />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Ver extrato"));
    expect(screen.getByLabelText("Data de início:")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Data de fim:")).not.toBeInTheDocument();
    expect(screen.getByText("Consultar faturamento")).not.toBeInTheDocument();
  });
  it("Valida quando tem informação incorreta", async () => {
    window.history.replaceState({}, "", "/");
    window.localStorage.setItem(
      "token",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTU5NjU5MCwiaWF0IjoxNjY5MzM3MzkwfQ.j47olYr5mUair_W4QlQt1CkrTUP52Tjp9y-mLzTy4cc"
      )
    );
    render(<App />, { wrapper: BrowserRouter });
    fireEvent.change(screen.getByLabelText("Quantia a receber:"), {
      target: { value: "3500.50" },
    });
    fireEvent.change(screen.getByLabelText("Número de parcelas:"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Dia do mês para cobrança:"), {
      target: { value: "45" },
    });
    fireEvent.change(screen.getByLabelText("Data da primeira parcela:"), {
      target: { value: "00-99-9999" },
    });
    fireEvent.click(screen.getByText("Registrar cobrança"));
    await waitFor(
      () =>
        expect(
          screen.getByText("Informações em formato incorreto.")
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
  it("Valida quando tem informação correta e mostra na tela", async () => {
    window.history.replaceState({}, "", "/");
    window.localStorage.setItem(
      "token",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTU5NjU5MCwiaWF0IjoxNjY5MzM3MzkwfQ.j47olYr5mUair_W4QlQt1CkrTUP52Tjp9y-mLzTy4cc"
      )
    );
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        id: "3534532143",
      })
    );
    render(<App />, { wrapper: BrowserRouter });
    fireEvent.change(screen.getByLabelText("Quantia a receber:"), {
      target: { value: "3500.50" },
    });
    fireEvent.change(screen.getByLabelText("Número de parcelas:"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Dia do mês para cobrança:"), {
      target: { value: "15" },
    });
    fireEvent.change(screen.getByLabelText("Data da primeira parcela:"), {
      target: { value: "2023-04-20" },
    });
    fireEvent.click(screen.getByText("Registrar cobrança"));
    await waitFor(
      () =>
        expect(
          screen.getByText("Registro efetuado com sucesso!")
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
});

describe("Statement", () => {
  beforeEach(() => {
    window.history.replaceState(window.history.state, "", "/statement");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
  });

  it("Volta na Main quando aperta voltar", async () => {
    window.history.replaceState({}, "", "/statement");
    window.localStorage.setItem(
      "token",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTU5NjU5MCwiaWF0IjoxNjY5MzM3MzkwfQ.j47olYr5mUair_W4QlQt1CkrTUP52Tjp9y-mLzTy4cc"
      )
    );
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        id: "3534532143",
      })
    );
    render(<App />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Voltar"));
    expect(screen.getByLabelText("Quantia a receber:")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de parcelas:")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Dia do mês para cobrança:")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Data da primeira parcela:")
    ).toBeInTheDocument();
    expect(screen.getByText("Registrar cobrança")).toBeInTheDocument();
  });

  it("Aparece a tabela de faturas se clicar em consultar", async () => {
    window.history.replaceState({}, "", "/statement");
    window.localStorage.setItem(
      "token",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTU5NjU5MCwiaWF0IjoxNjY5MzM3MzkwfQ.j47olYr5mUair_W4QlQt1CkrTUP52Tjp9y-mLzTy4cc"
      )
    );
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        id: "3534532143",
      })
    );
    render(<App />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Consultar faturamento"));
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(window.document.querySelector(".statement")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
