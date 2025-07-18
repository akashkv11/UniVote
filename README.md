# Univote 🗳️

**Univote** is a modular hybrid polling application that allows users to create, share, and vote on polls using email-based OTP authentication. It supports both anonymous and authenticated poll creation while ensuring vote integrity and user privacy.

## 🚀 Features

- ✅ Create polls anonymously or with email-based claim
- 🔐 OTP authentication via email
- 🗳️ One vote per email (no duplicates)
- 📊 Real-time results for poll creators
- 🔗 Shareable poll links with unique codes
- ❌ Spam & abuse prevention (rate-limiting, OTP resend cooldown)
- 📈 Optional visualizations (charts/graphs for poll results)

## 🧱 Modular Architecture

### 1. Auth Module

- Send & verify OTP via email
- Rate-limiting to prevent abuse

### 2. Poll Module

- Create polls
- Claim polls via OTP

### 3. Vote Module

- Vote with OTP verification
- Prevent multiple votes

### 4. Results Module

- Aggregate results
- Secure access for creators

### 5. Poll Sharing Module

- Unique poll codes
- Shareable links

### 6. Frontend UI Module

- Home, Create, Vote, Results, Error Views

### 7. Utils / Services Module

- OTP generation
- Code handling
- Logging

### 8. Optional: Admin Module

- Manage polls
- Ban emails or prevent spam

## 🛠️ Tech Stack

- **Frontend:** Next.js, TailwindCSS
- **Backend:** Supabase, Prisma ORM, Nodemailer
- **Authentication:** OTP over Email
- **Optional:** Charting Libraries (for visual results)

## 🧪 Flow Summary

1. User visits home page
2. Creates a poll (can be anonymous)
3. Shares the poll link/code
4. Voters enter email & receive OTP
5. After verifying OTP, they vote
6. Creator can view poll results (if claimed)

## 🌟 Status

Currently in **planning and early development phase**. Looking for collaborators.

## 🤝 Contributing

Want to contribute? Great! I'm actively looking for:

- Frontend Developers (Next.js, TailwindCSS)
- Backend Developers (Supabase, Prisma, Node.js)
- Full-Stack Developers
- UI/UX Designers
- Security/DevOps enthusiasts

> Feel free to fork, star ⭐, or open an issue. Let's build this together!

## 📬 Contact

If you're interested, DM me on [LinkedIn](#https://www.linkedin.com/in/akash-k-v/) or drop an issue in this repo.

---

MIT License
