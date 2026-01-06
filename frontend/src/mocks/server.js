import { setupServer } from "msw/node";
import { handleAuth } from "./handleAuth";

//這裡是檢查站
export const server = setupServer(...handleAuth);
