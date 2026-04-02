# Setup Guide

Follow these steps to run the project locally.

---

## 1. Download & Extract

After purchasing, download the `.zip` file and extract it.

---

## 2. Open the Project

Open the extracted folder in your code editor (VSCode recommended).

---

## 3. Install Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

---

## 4. Run the Development Server

```bash
npm run dev
```

```bash
http://localhost:8888
```

---

## 5. Login to the App

Use the demo login:

- **Admin** → full access (all permissions)
- **Editor** → limited access

---

## 6. Data Source

This project uses a mock API (MockAPI).

You can:

- Use the existing demo API (already configured)
- Replace it with your own backend

---

## 7. Environment Variables (Optional)

If you want to use your own API, create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

---

## 8. Project Structure Overview

```
app/
  (marketing)     → landing page
  (auth)          → login page
  (protected)     → dashboard, users, roles

features/
  users/
  roles/

shared/
  components/
  providers/
```

---

## 9. RBAC System

Permissions follow this format:

```
module.action
```

Examples:

- `users.view`
- `users.create`
- `roles.update`

---

## 10. Role Preview (Optional Feature)

Use the preview switcher in the top bar to simulate different roles.

To disable this feature, update:

```js
const ENABLE_ROLE_PREVIEW = false
```

---

## 11. Deployment

You can deploy this project using:

- Vercel
- Netlify
