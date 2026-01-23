import { render, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/theme";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";

/**
 * 建立包含所有必要 Provider 的測試 Wrapper 元件
 * @param {import('@reduxjs/toolkit').EnhancedStore} store - Redux store 實體
 * @returns {React.ComponentType<{children: React.ReactNode}>} 包含 Redux Provider、ThemeProvider、MemoryRouter 和 ToastContainer 的 Wrapper 元件
 */
function createWrapper(store) {
  return ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          {children}
          <ToastContainer position="top-left" autoClose={1000} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}

/**
 * 渲染 React 元件並包含所有測試所需的 Provider
 * @param {React.ReactElement} ui - 要測試的 React 元件
 * @param {Object} [options={}] - 渲染選項
 * @param {Object} [options.preloadedState={}] - Redux store 的初始狀態
 * @param {import('@reduxjs/toolkit').EnhancedStore} [options.store] - 自訂的 Redux store，預設會建立新的 store
 * @param {import('@testing-library/react').RenderOptions} [options.renderOptions] - React Testing Library 的其他渲染選項
 * @returns {Object} 包含 store 和 React Testing Library 渲染結果的物件
 */
export function renderWithProviders(
  //1.要測試的元件
  ui,

  // 2. 設定檔 如果都沒有設置 預設為空物件
  {
    preloadedState = {},
    // 每次都建立一個全新的 store 實體
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  //???

  // function Wrapper({ children }) {
  //   return (
  //     <Provider store={store}>
  //       <ThemeProvider theme={lightTheme}>
  //         <MemoryRouter>
  //           {children}
  //           <ToastContainer />
  //         </MemoryRouter>
  //       </ThemeProvider>
  //     </Provider>
  //   );
  // }

  const Wrapper = createWrapper(store);

  //???
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * 渲染 React Hook 並包含所有測試所需的 Provider
 * @param {Function} hook - 要測試的 React Hook 函式
 * @param {Object} [options={}] - 渲染選項
 * @param {Object} [options.preloadedState={}] - Redux store 的初始狀態
 * @param {import('@reduxjs/toolkit').EnhancedStore} [options.store] - 自訂的 Redux store，預設會建立新的 store
 * @param {import('@testing-library/react').RenderHookOptions} [options.renderOptions] - React Testing Library 的其他渲染選項
 * @returns {Object} 包含 store 和 React Testing Library renderHook 結果的物件
 */
export function renderHookWithProviders(
  hook,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  const Wrapper = createWrapper(store);

  return {
    store,
    ...renderHook(hook, { wrapper: Wrapper, ...renderOptions }),
  };
}
