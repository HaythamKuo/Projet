import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";

import { renderWithProviders } from "../mocks/utils";

import LoginPage from "../routes/LoginPage";
import { server } from "../mocks/server";

describe("測試LoginPage component", () => {
  it("測試登入成功(郵件與密碼)", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginPage />);

    const mail = await screen.findByLabelText(/電子郵件/i);
    const password = await screen.findByLabelText(/密碼/i);
    const submitBtn = await screen.findByRole("button", { name: /登入/i });

    await user.type(mail, "456789@gmail.com");
    await user.type(password, "456789");

    await user.click(submitBtn);

    // const successMes = await screen.findByText(
    //   /登入成功/i,
    //   {},
    //   { timeout: 3000 }
    // );
    const successMes = await screen.findByText("登入成功");
    // const toastSuccess = await screen.findByRole("alert");
    // expect(toastSuccess).toHaveTextContent("登入成功");

    expect(successMes).toBeInTheDocument();
  });

  it("測試登入失敗(郵件與密碼)", async () => {
    const user = userEvent.setup();

    server.use(
      http.post("*/api/users/login", () => {
        return HttpResponse.json({ message: "登入失敗" }, { status: 401 });
      })
    );

    renderWithProviders(<LoginPage />);

    const mail = await screen.findByLabelText(/電子郵件/i);
    const password = await screen.findByLabelText(/密碼/i);
    const submitBtn = await screen.findByRole("button", { name: /登入/i });

    await user.type(mail, "123456@gmail.com");
    await user.type(password, "123456");
    await user.click(submitBtn);
    // screen.debug();

    const errMes = await screen.findByText("登入失敗");

    expect(errMes).toBeInTheDocument();

    // const toastFailed = await screen.findByRole("alert");
    // expect(toastFailed).toHaveTextContent("登入失敗");
  });
});
