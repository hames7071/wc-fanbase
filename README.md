# WC Fanbase Portal

Vite + React + Tailwind client that integrates with Supabase for profiles and avatar storage.

Setup

1. Copy this folder to your dev machine.
2. Install deps:

```bash
npm install
```

3. Create a `.env` file at project root with:

```
VITE_SUPABASE_URL=https://your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASS=your-admin-pass
```

4. Run dev server:

```bash
npm run dev
```

Notes
- Registration attempts to create a Supabase Auth user and then inserts a `profiles` row (the SQL schema you provided).
- Ensure the `profiles` table and `avatars` public bucket exist in your Supabase project.
