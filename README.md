# OpenClaw Shovel 🚀

The ultimate foundational SaaS boilerplate built with Next.js App Router, React, TypeScript, and Tailwind CSS. OpenClaw Shovel provides a robust starting point for modern web applications with a focus on AI integrations, Stripe billing, and Telegram bots.

## 🌟 Features

- **Modern Tech Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth (Email/Password & Google OAuth)
- **Database**: Supabase PostgreSQL with Prisma/raw queries and Row Level Security (RLS)
- **Billing**: Stripe Checkout and Customer Portal integrations
- **AI Integrations**: Ready-to-use OpenAI and Anthropic SDKs with encrypted API key storage
- **Telegram Bot**: Per-user Telegram bot integration and message routing
- **Deployment**: Automated Fly.io deployment script
- **White-Label Ready**: Easily customize branding and themes via environment variables

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages, layouts, and API routes
│   ├── (auth)/           # Authentication routes (login/signup)
│   ├── admin/            # Admin dashboard routes
│   ├── dashboard/        # User dashboard and settings routes
│   └── api/              # API routes for Billing, AI, Telegram, and Health
├── components/           # Reusable React components
│   ├── layout/           # Structural components (Navbar, Sidebar)
│   └── ui/               # Base UI components (Buttons, Cards, Inputs)
├── lib/                  # Utility functions and app configuration
├── services/             # External service integrations
│   ├── ai/               # AI provider services (OpenAI, Anthropic)
│   ├── auth/             # Authentication services (Supabase)
│   ├── billing/          # Payment processing (Stripe)
│   ├── database/         # Database queries (Supabase)
│   ├── security/         # Encryption services for API keys
│   └── telegram/         # Telegram bot integration
├── types/                # Global TypeScript definitions & Database types
└── scripts/              # Deployment and utility scripts
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Fill in all the required keys for Supabase, Stripe, and Encryption.

3. **Database Setup**
   Run the provided `supabase-schema.sql` in your Supabase SQL editor to create the necessary tables and Row Level Security (RLS) policies.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 White-Label Customization

OpenClaw Shovel is designed to be easily rebranded. You can customize the application name, description, company name, and primary theme color without changing code by setting the following environment variables in your `.env.local` or production environment:

```env
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_DESCRIPTION="Your app description goes here."
NEXT_PUBLIC_COMPANY_NAME="Your Company Inc."
NEXT_PUBLIC_THEME_PRIMARY="blue" # Tailwind color name (e.g., violet, indigo, emerald)
```

The application will automatically pick up these variables and update the UI accordingly.

## 🚢 Deployment (Fly.io)

OpenClaw Shovel includes an automated deployment script for [Fly.io](https://fly.io/).

1. Ensure you have the [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) installed and are logged in (`fly auth login`).
2. Run the deployment script:
   ```bash
   npx ts-node scripts/deploy.ts
   ```
   *Note: Ensure you have `ts-node` installed globally or locally.*

The script will automatically detect if a `fly.toml` exists. If not, it will initialize a new Fly app, generate a highly optimized Next.js `Dockerfile`, and deploy the application. 

**Don't forget** to set your production environment variables in the Fly dashboard or via the CLI:
```bash
fly secrets set NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...
```

## 🛠️ Next Steps

Your SaaS is launch-ready! From here, you can:
1. Customize the landing page in `src/app/page.tsx`
2. Add more AI models in `src/services/ai/providers`
3. Expand your database schema in Supabase
4. Configure Stripe Webhooks to point to `https://your-domain.com/api/billing/webhook`

## 📄 License

MIT
# openclaw-kit
