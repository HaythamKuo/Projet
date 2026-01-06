import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/theme";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";

export function renderWithProviders(
  //1.要測試的元件
  ui,

  // 2. 設定檔 如果都沒有設置 預設為空物件
  {
    preloadedState = {},
    // 每次都建立一個全新的 store 實體
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  //???

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <MemoryRouter>
            {children}
            <ToastContainer />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  }
  //???
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
