# 🛍️ Adhikari Pasal

Adhikari Pasal is a modern full-stack **E-commerce web application** built with a powerful combination of **Node.js, Express, MongoDB, Cloudinary, React (Vite + TypeScript)**.  
It allows users to browse products, add them to their cart, and make purchases, while admins can manage products, orders, and users.

---

## 🚀 Tech Stack

### 🖥️ Frontend

- **React** (with **Vite** for lightning-fast builds)
- **TypeScript**
- **Axios** (for API calls)
- **React Router DOM** (for routing)
- **Zustand** (for state management)
- **TailwindCSS** (for styling)

### ⚙️ Backend

- **Node.js** with **Express.js**
- **MongoDB** (via **Mongoose** ODM)
- **Cloudinary** (for image storage)
- **JWT Authentication**
- **bcrypt** (for password hashing)
- **Multer** (for file uploads)
- **dotenv** (for environment variables)
- **CORS**

---

## 🗄️ Project Structure

### Backend (`/server`)

server/
│
├── app.js
├── package.json
├── .env
├── /config
│ ├── cloudinary.js
│ ├── khalti.js
│ └── mongoose_connection.js
|
├── /controllers
│ ├── authController.js
│ ├── cartController.js
│ ├── notificationController.js
│ └── orderController.js
│ ├── paymentController.js
│ ├── productController.js
|
├── /middleware
│ ├── isAdmin.js
│ ├── isLoggedIn.js
│ └── multer.js
|
├── /models
│ ├── cart-model.js
│ ├── notification-model.js
│ ├── order-model.js
│ ├── payment-model.js
│ ├── product-model.js
│ ├── purchased-item-model.js
│ └── user-model.js
|
├── /node_modules
|
├── /routes
│ ├── cartRouter.js
│ ├── notificationRouter.js
│ └── orderRouter.js
│ └── paymentRouter.js
│ └── productRouter.js
│ └── userRouter.js
|
├── /utils
│ ├── orderStatus.js
|
├──app.js
