# Doll Soldier

> 一個完整的全端電商平台專案，前端採用 React 生態系，後端提供 RESTful API，整合第三方登入與金流（ECPay）。

## 技術架構

### Frontend（Client）

- React + Vite
- Redux Toolkit/RTK Query
- React Router
- Styled-components
- Framer Motion
- Vitest/Testing Library/MSW

### Backend（Server）

- Node.js + Express
- MongoDB (Mongoose)
- JWT/Passport
- Google OAuth/LINE Login
- ECPay 金流
- Google Cloud Storage
- Joi Validation

## 專案結構

```bash
doll-soldier/
├── frontend/        # 前端（React + Vite）
│   └── README.md
├── backend/       # 後端（Express API）
│   └── README.md
└── README.md
```

## 功能摘要

- 使用者註冊/登入（JWT）
- Google/LINE 第三方登入
- 商品 CRUD
- 購物車管理
- 訂單與付款流程（ECPay）
- 角色狀態（買家 / 賣家）
- 圖片上傳（GCS）
- 前端狀態同步與樂觀更新
- 單元測試與 API Mock

## 專案目標

- 展示全端開發能力
- 練習實務導向的系統架構設計
- 熟悉第三方服務整合（OAuth/金流/雲端儲存）
- 建立可擴充、可維護的專案結構
