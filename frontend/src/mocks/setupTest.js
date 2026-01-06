import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";

// 1. 🏁 所有測試開始前 -> 啟動伺服器
// 就像訓練中心開門，準備攔截請求
beforeAll(() => server.listen());

// 2. 🧹 每個測試結束後 -> 重置處理程序 (Reset Handlers)
// 這很重要！就像在換下一隻狗狗訓練前，先把地上的零食清乾淨，避免影響下一場測試
afterEach(() => server.resetHandlers());

// 3. 🚪 所有測試結束後 -> 關閉伺服器
// 測試結束，打卡下班
afterAll(() => server.close());
