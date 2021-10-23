# Blog of Andreas Klinger

In this repository you will find the source code for [klinger.io](https://klinger.io/).

## Techstack

It is a markdown based blog developed with [React](https://reactjs.org/), [Next](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/). The site is statically hosted on [Firebase](https://firebase.google.com/) and uses the Realtime Database to capture and display the current views of each blog post.

To reduce the bundle size, we replace [React](https://reactjs.org/) with [Preact](https://preactjs.com/) in the production build.

## Getting started

Step 1: Clone repository

```bash
git clone git@github.com:andreasklinger/klinger-io.git
```

Step 2: Install dependencies

```bash
npm install
```

Step 3: Start development server

```bash
npm run dev
```

## Deployment

Changes to the "main" branch that are added to the GitHub repository result in an automatic deployment of a static version on Firebase Hosting. Therefore, it is not necessary to update the website manually.

If a circumstance requires manual deployment, perform the following steps:

Step 1: Create production build

```bash
npm run build
```

Step 2: Deploy via Firebase

```bash
npm run deploy
```

> For this, the Firebase CLI must be installed globally (`npm install -g firebase-tools`) and it is required that you log in through it (`firebase login`). Furthermore, you need the necessary project permissions for the deployment.

## Add blog post

New blog posts can be added directly via the GitHub website.

Step 1: Open [/posts](https://github.com/andreasklinger/klinger-io/tree/main/posts) directory

Step 2: Click on "Add file" in upper right corner

Step 3: Open [sluggenerator](https://www.slugenerator.com/) and convert title of post to a slug, which you then use with file extension ".mdx" as filename

Step 4: Insert following header into file and replace placeholders

```mdx
---
title: 'Title'
publishedAt: 'YYYY-MM-DD'
summary: 'Summary (max. 160 characters)'
---
```

Step 5: Add content as markdown to file

> Since it is a .mdx file, React elements (HTML) can be added between the markdown as JSX.

## Add image to post

Follow these steps to add a new image to a blog post that is not from an external source. In this way, the image is automatically saved in different quality levels during the building process to reduce network traffic.

Step 1: Add your image to [/public/images](https://github.com/andreasklinger/klinger-io/tree/main/public/images)

Step 2: Use the image as follows

```mdx
<Image src="your-image.jpg" alt="Your image description" />
```

> The `<Image />` component does not need to be imported, but can be inserted directly between the markdown code. It is important to pass only the file name to the src attribute. The path to the `/public/images` directory is automatically resolved.
