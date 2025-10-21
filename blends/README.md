🧑‍💻 Member 1: Backend & Authentication Engineer(Adrian)
Responsibilities

Setup Node.js + Express.js project

Connect MongoDB Atlas

Build User model & authentication routes

Implement JWT-based login/signup

Add bcrypt for password hashing

Develop college email verification system

Generate OTP → Send email (Nodemailer)

Verify OTP → Mark collegeVerified: true

College detection using email domain

Create middleware for auth validation

Setup .env for secrets & config

Maintain clean folder structure (/models, /controllers, /routes)

Deliverables

/auth/signup, /auth/login, /auth/verify-otp APIs

JWT auth + OTP verification working end-to-end

College detection feature

Secure routes for logged-in users

Tools & Libraries

Express.js, bcrypt, jsonwebtoken, nodemailer, mongoose

🧑‍💻 Member 2: Event, Team & QR Module Developer(Punith)
Responsibilities

Design Event, Team, and Club models

Build all event CRUD APIs

/events/create, /events, /events/:id, /events/:id/register

Integrate Razorpay payment gateway

Create order → Verify payment → Confirm registration

Implement QR code system

Generate QR for each successful registration (qrcode npm)

Store QR in DB + send email confirmation

Develop attendance check-in route

QR scanning → Verify → Mark attendance

Implement Team creation/join APIs

/team/create, /team/join, /team/event/:id

Maintain leaderboard system

Deliverables

Fully functional event registration + QR ticket flow

Razorpay integrated backend

Team management & leaderboard APIs

Attendance tracking via QR scanning endpoint

Tools & Libraries

qrcode, razorpay, mongoose, express-validator

🎨 Member 3: Frontend & UI Developer(Devesh)
Responsibilities

Setup Next.js + TailwindCSS + Shadcn UI

Build following pages:

/ Landing page

/auth/signup & /auth/login

/onboarding (college & interest selection)

/verify-college-email

/events (search/filter)

/events/[id] (event detail + registration)

/my-tickets (QR display)

/profile (settings, FAQ, terms)

Integrate backend APIs using axios

Display QR tickets post-registration

Ensure mobile responsiveness

Setup loading + toast notifications

Deliverables

Fully responsive UI

API-connected pages

Proper routing, navigation, and state management

Completed profile and tickets section

Tools & Libraries

Next.js, TailwindCSS, Shadcn UI, Axios, React Hook Form, Framer Motion

📈 Member 4: Organizer Dashboard & Integration Engineer(Bilal)
Responsibilities

Build Organizer Dashboard

/dashboard/organizer

View event performance: registrations, attendance, revenue

Integrate analytics API

Fetch metrics from backend

Visualize with Chart.js

Implement QR scanner

Use react-qr-reader or html5-qrcode

On scan → Call /qr/scan API → Mark attendance

Create Club management interface

Club events, members, and analytics

Setup notifications

Email or WhatsApp using Twilio or Nodemailer

Confirmation messages after registration or check-in

Add admin privileges (optional)

Approve events, moderate clubs

Deliverables

Organizer analytics dashboard with charts

QR scanning working end-to-end

Notification system integrated

Club analytics with event metrics

Tools & Libraries

Chart.js, react-qr-reader, Twilio, Axios