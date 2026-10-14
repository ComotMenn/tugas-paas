This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy ke Cloudflare Pages

Aplikasi ini menggunakan Next.js static export karena seluruh fiturnya berjalan di browser. Hasil build berada di folder `out`, jadi tidak perlu Worker adapter atau konfigurasi `wrangler.jsonc`.

### Uji build lokal

Jalankan `npm run build`. Pastikan proses berhasil dan folder `out` terbentuk sebelum menghubungkan repository ke Cloudflare.

### Hubungkan repository GitHub

1. Push project ini ke repository GitHub.
2. Di dashboard Cloudflare, buka **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Pilih repository GitHub project ini.
4. Atur **Production branch** ke `main`.
5. Pilih preset **Next.js (Static HTML Export)**. Jika pengaturan tidak terisi otomatis, gunakan build command `npx next build` dan build output directory `out`.
6. Tambahkan build environment variable `NODE_VERSION` dengan nilai `22`, lalu simpan dan deploy.

Setelah deployment pertama berhasil, setiap push ke branch `main` akan memicu deployment otomatis; pull request akan mendapat deployment preview.

> Static export cocok untuk aplikasi TaskMate saat ini. Fitur yang memerlukan server Next.js, seperti API Routes dinamis, Server Actions, cookies, atau rendering saat request, tidak tersedia pada setup ini. Jika fitur server diperlukan nanti, gunakan Cloudflare Workers dengan jalur Next.js yang direkomendasikan Cloudflare.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
