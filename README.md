This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run in project root directory

```bash
npm install
# or
yarn i
# or
pnpm i
# or
bun i
```

Run a postgresql from neondb or docker by using the command mentioned below 

```bash

docker create volume "volume name"

docker run -p 5432:5432 -e POSTGRES_PASSWORD=noob -v "volume name":/var/lib/postgresql/data -d postgres

```

Now fill the `.env` file the database url 

Finally, run the development server:

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

## This is Next Starter Template with Lucia Auth, Shadcn, NextUI and Aceternity.

-   [x] Password Login
-   [x] Forget Password Mail
-   [x] Mail Verification
-   [x] UI Libraries
-   [x] Prisma
-   [ ] Dockerized app


> **Note:** Change Schema for Input validation in schema.ts file
