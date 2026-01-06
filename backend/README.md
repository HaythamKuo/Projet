# Doll Project - Backend

> **電商專案---後端架構，由 Node.js 與 Express.js 建構**

## 技術棧

Node.js, Express.js, MongoDB (Mongoose ODM), MongoDB Altas, JWT, Passport.js, Google OAuth 2.0, Line login, Multer, GCS, ECPay 綠界金流, Joi, Express-session, Cookie-parser, Cors

## 環境變數

在 `.env` 文件中配置以下變數：

```env

NODE_ENV=development

PORT=5001(default)



# MongoDB

MONGODB_URI_PROD=<MongoDB Atlas URI>

MONGODB_URI_DEV=mongodb://localhost:27017/dollDev



# JWT

JWT_SECRET=<your_jwt_secret>



# Google Cloud Storage

PROJECT_ID=<gcp_project_id>

BUCKET_NAME=<gcs_bucket_name>



# Google OAuth

CLIENT_ID=<google_oauth_client_id>

CLIENT_SECRET=<google_oauth_client_secret>



# LINE Login

LINE_CLIENT_ID=<line_client_id>

LINE_CLIENT_SECRET=<line_client_secret>



# Frontend URL

CLIENT_PRODUCTION=<production_frontend_url>

CLIENT_ROUTE_DEV=http://localhost:5173



# ECPay

ECPAYRETURN_URL=<ecpay_return_url>

ECPAYRETURN_URL_PRODUCTION=<ecpay_return_url_production>

```

## 安裝與運行

### 安裝依賴

```bash

npm install

```

### 開發環境運行

```bash

npm run dev

```

### 生產環境運行

```bash

npm start

```

## 功能特性

### 認證與授權

- JWT token 驗證
- Google OAuth 2.0 第三方登入
- LINE Login 第三方登入
- Cookie-based session 管理
- bcrypt 密碼加密

### 檔案上傳

- Multer 處理文件上傳
- Google Cloud Storage 儲存

### 資料驗證

- Joi schema 驗證
- 自定義驗證中間件

### 錯誤處理

- 統一錯誤處理中間件
- Express async handler

### CORS 配置

- 開發/生產環境分離配置
- 支援 credentials
