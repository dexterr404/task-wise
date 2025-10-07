# 🧠 TaskWise — Multi-Tenant SaaS Task Management Platform (MERN Stack)

![License](https://img.shields.io/badge/license-MIT-blue) ![Node](https://img.shields.io/badge/node-v18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)

![TaskWise Banner](https://raw.githubusercontent.com/dexterr404/task-wise/main/client/src/assets/taskwise.svg)

> A full-stack, AI-enhanced, collaborative task management SaaS built using the MERN stack.  
> Personal productivity meets team collaboration — with real-time updates, AI insights, and seamless role-based control.

**🌐 [Live Demo](https://task-wise-nine.vercel.app/)** | **📂 [GitHub Repository](https://github.com/dexterr404/task-wise)**

---

## 🚀 Overview

**TaskWise** is a **multi-tenant SaaS application** designed to empower individuals and teams to manage tasks efficiently.  
From personal goals to team-level collaboration, TaskWise adapts dynamically — offering modern UI, deep analytics, and intelligent insights powered by **OpenAI**.

Built with **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**, it provides a robust, real-time, and highly scalable environment.  

---

## ✨ Key Features

### 🧍 Personal Task Management
- Create, edit, duplicate, archive, or unarchive personal tasks  
- Manage tasks in a **list view** with smooth CRUD operations  
- Track task deadlines, progress, and completion rate  
- Fully responsive interface with **light/dark/system themes**

### 👥 Team Collaboration
- **3 dynamic task views**: Card, Table, and List  
- Filter tasks by:
  - Description keywords
  - Subtask content
  - Assigned users
- Assign or unassign tasks to members  
- Comment and upload images on tasks  
- View team members' **online status**  
- Smart notifications (specific, group, or all members)  
- Mark all notifications as read & access full notification history  
- Invite others via **team invite links**

### 🧩 Roles & Permissions
- **Leader** → Full access (edit/delete team)  
- **Admin** → Edit-only capabilities  
- **Member** → View-only access  

### 📦 Archiving System
- Tasks aren't deleted — they're **archived for safe retrieval** anytime  
- Supports both personal and team tasks

### 🧾 Logging & History
- Comprehensive team activity log:
  - User joined/left
  - Task created/updated/assigned
  - Comment actions, and more  
- Filter logs by:
  - User involved
  - Related entity (Task, Member, Team)
  - Type of action (creation/update/etc.)

---

## 🤖 AI-Powered Features

- **OpenAI Integration**
  - Personalized **Task Insights** (ongoing tasks, deadlines, and trends)
  - Intelligent summaries and progress recommendations  
- **AI Assistant Chatbot**
  - Context-aware conversation powered by **vector embeddings** stored in **Supabase**
  - Understands team data and tasks for contextual suggestions  
- **FAQ Helpbot (on the promo website)**
  - Uses **Supabase vector embeddings** for dynamic FAQ retrieval  

---

## 💳 Subscription & Monetization

| Plan | Description | Key Benefits |
|------|--------------|---------------|
| 🆓 **Free Plan** | For individuals exploring TaskWise | - Join/Create up to 3 teams<br>- 12h cooldown on AI insights |
| 💎 **Pro Plan** ($5/month) | Unlock the full power of TaskWise | - Unlimited team creation<br>- 30min cooldown on insights<br>- Access to AI chatbot assistant |

### 🔁 Billing Details
- Secure **PayPal recurring subscriptions**
- Cancel anytime — access retained until billing cycle end  
- Automatic hourly subscription checks with **NodeCron**  
- Invoice viewing and failed-payment reversion handled automatically  

---

## 📊 Dashboard Highlights

- Metric cards show **task counts** (Total, Done, Ongoing, Pending)  
- Growth analytics compared month-to-month  
- AI-powered task insights  
- Interactive **calendar view** showing due dates  
- Task distribution by status (done, ongoing, not started)  
- **Focus Mode:** Countdown timer for chosen task's deadline  

---

## 🛠️ Tech Stack

**Frontend**
- ⚛️ React (Vite)
- 💨 Tailwind CSS
- 🎨 Material-UI (MUI)
- 🎞️ Framer Motion

**Backend**
- 🧩 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication + Google OAuth2
- 🔄 Socket.io for real-time updates
- 🕓 NodeCron (subscription checks)
- 💵 PayPal REST API

**AI & Data**
- 🤖 OpenAI API (Insights & Chatbot)
- 🧠 Supabase (Vector Embeddings + FAQ Search)

**Infrastructure**
- ☁️ Cloudinary (Image uploads)
- 📮 Resend (Email service) (I don't have my own domain😭)
- 🚀 Upstash Redis (Caching & rate limiting)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm**

You'll also need accounts/API keys for:
- OpenAI
- PayPal Developer
- Cloudinary
- Supabase
- Google OAuth2
- Upstash Redis
- Resend (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dexterr404/task-wise.git
   cd task-wise
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   Create `.env` files in both `client` and `server` directories:

   **Client `.env`** (in `client/` folder):
   ```properties
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_URL=http://localhost:5173
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

   **Server `.env`** (in `server/` folder):
   ```properties
   # Database
   MONGO_URI=your_mongodb_connection_string
   PORT=5000

   # Redis Cache
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token

   # Authentication
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Cloudinary (Image Uploads)
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   CLOUDINARY_NAME=your_cloudinary_cloud_name

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_ASSISTANT_ID=your_assistant_id

   # App URLs
   APP_BASE_URL=http://localhost:5173
   APP_BASE_URL2=https://task-wise-nine.vercel.app
   API_BASE_URL=http://localhost:5000
   API_BASE_URL2=your_production_api_url

   # Email Service
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   RESEND_API_KEY=your_resend_api_key

   # Supabase (Vector Store)
   SUPABASE_KEY=your_supabase_key
   SUPABASE_URL=your_supabase_url

   # PayPal
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_secret
   PAYPAL_WEBHOOK_ID=your_webhook_id

   # Environment
   NODE_ENV=development
   ```

4. **Run the application**

   Open two terminal windows:

   **Terminal 1 - Start the server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the client:**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 🧠 Architecture

```
MERN Stack
│
├── Frontend: React + Material UI + Tailwind CSS + Framer Motion
│   ├── Pages: Dashboard, Personal, Team
│   ├── Features: Dynamic task views, Animations, Responsive design
│
├── Backend: Node.js + Express + MongoDB + JWT Auth
│   ├── Role-based access control
│   ├── Rate limiting middleware
│   ├── Google OAuth2 authentication
│
├── Real-Time: Socket.io
│   ├── Team updates, presence, comments
│
├── AI: OpenAI API + Supabase Vector Store
│   ├── Task insights + Chatbot
│
└── Scheduler: NodeCron
    ├── Subscription verification & cleanup
```

---

## 🌗 Theme & Responsiveness

- **Light**, **Dark**, and **System-adaptive** themes  
- Fully responsive across all screen sizes  
- Built with modern UI principles — fluid grids, shadows, and micro-animations  

---

## 🔐 Authentication

- Secure login via **Google OAuth2** or **email/password**
- Access tokens handled with **JWT**
- Session protection with **rate-limiting middleware**

---

## ⚡ Real-Time Collaboration

- WebSocket-driven updates for:
  - Task creation/updates
  - Comment additions
  - Member online/offline presence  
- Optimized for low-latency team interactions

---

## 🗺️ Roadmap

- [ ] Email services and password reset
- [ ] Mobile app (React Native)
- [ ] Slack/Discord integrations
- [ ] Advanced analytics dashboard
- [ ] Task templates library
- [ ] Gantt chart view
- [ ] Time tracking features

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR:
- Follows the existing code style
- Includes relevant tests
- Updates documentation as needed

---

## 🧾 License

This project is licensed under the [MIT License](https://github.com/dexterr404/task-wise/blob/main/LICENSE).

---

## 🌐 Connect With Me

🐙 [GitHub](https://github.com/dexterr404)  
💼 [LinkedIn](https://www.linkedin.com/in/dexter-ian-javier-09397637b/)  
📧 [Email Me](mailto:dexterr404.dev@gmail.com)

---

> _"TaskWise — Work smarter, not harder."_

⭐ **If you find this project useful, please consider giving it a star!**
