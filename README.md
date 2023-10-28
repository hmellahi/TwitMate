
## Project Overview

Taking inspiration from Twitter, I embarked on this project for the purpose of learning and personal growth. It brings together the best of social media, allowing you to post updates, join conversations, and even create your own communities. Your account is protected with secure login options, and the platform ensures everything runs smoothly. It's a safe and engaging space for connecting with others, all while serving as a valuable learning experience

&nbsp;&nbsp;
<div align="center" style="margin: 20px 0;">
  <img width="800" alt="Screenshot 2023-10-23 at 23 43 57" src="https://github.com/hmellahi/Twitter-Clone/assets/47065280/af677130-d8ea-494c-82af-1a41403f6a93">
</div>
&nbsp;&nbsp;

## Technology Stack

This project employs a range of cutting-edge technologies:

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <span style="margin-left: 5px;"><strong>OpenAI API:</strong> Generate users bios</span>
</div>
<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <span style="margin-left: 5px;"><strong>Clerk js:</strong> Handle authentication and communities</span>
</div>
<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg" width="18" height="18" alt="Vue" />
  <span style="margin-left: 5px;"><strong>Next JS:</strong> Full stack Framework</span>
</div>

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="18" height="18" alt="TailwindCSS" />
  <span style="margin-left: 5px;"><strong>Tailwind CSS:</strong> Styling library for modern and responsive user interfaces.</span>
</div>

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg" width="18" height="18" alt="PostgreSQL" />
  <span style="margin-left: 5px;"><strong>Postgres:</strong> Database for efficient data storage.</span>
</div>

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="18" height="18" alt="TypeScript" />
  <span style="margin-left: 5px;"><strong>TypeScript:</strong> Superset of JavaScript with static typing for enhanced development.</span>
</div>

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://zustand-demo.pmnd.rs/favicon.ico" width="18" height="18" alt="Zustland" />
  <span style="margin-left: 5px;"><strong>Zustland:</strong> State management library</span>
</div>

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://www.prisma.io/images/favicon-32x32.png" width="18" height="18" alt="Prisma" />
  <span style="margin-left: 5px;"><strong>Prisma:</strong> Database toolkit</span>
</div>

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://res-s.cloudinary.com/prod/image/upload/w_32/console/favicon.png?_s=dam" width="18" height="18" alt="Cloudnify" />
  <span style="margin-left: 5px;"><strong>Cloudnify:</strong> Cloud storage for images</span>
</div>

## Key Features

### Feed

- **Primary Purpose:** Share posts and view other users' posts.
  - The feed includes:
    - See suggested threads.
    - Users can react/reply to a thread.
    - Users can see who replied.
    - Users can write a thread with images.
    - User can delete his thread

### User Account

- **User Authentication:**
  - Users can log in with Google/GitHub OAuth (customizable).
  - Users can log in using a password.
  - Access granted after completing onboarding.
&nbsp;
<div align="center" style="margin: 20px 0;">
  <img align="center" width="753" alt="Screenshot 2023-10-23 at 23:43:57" src="https://github.com/hmellahi/Twitter-Clone/assets/47065280/f40729c7-38d5-4383-bf8c-5bdcf8334789" style="border-radius: 20px;">
</div>
&nbsp;&nbsp;&nbsp;

- **Profile Viewing:**
  - User can lookup other users
  - View other users profiles, including their posts and activity.
  - users can edit their own profiles.


<div align="center" style="margin: 20px 0;">
  <img align="center" width="800" alt="Screenshot 2023-10-23 at 23:43:57" src="https://github.com/hmellahi/Twitter-Clone/assets/47065280/e25e2961-aefb-4711-b1fa-c4d833baea70" style="border-radius: 20px;">
</div>


### Community!

  - Users can create communities.
  - Invite members via email to join a community.
  - Users can update/remove their communities.
  - Community admins can manage members' roles.


  <div align="center" style="margin: 20px 20px;">
    <img align="center" width="800" alt="Screenshot 2023-10-23 at 23:43:57" src="https://github.com/hmellahi/Twitter-Clone/assets/47065280/0c0d4bd8-069c-4379-a089-5af9a240d044" style="border-radius: 20px;">
  </div>
&nbsp;&nbsp;&nbsp;
  <div align="center" style="margin: 20px">
    <img align="center" width="800" alt="Screenshot 2023-10-23 at 23:43:57" src="https://github.com/hmellahi/Twitter-Clone/assets/47065280/92813157-b58b-4f7b-b0bb-d7fe1375aaa1" style="border-radius: 20px;">
  </div>
&nbsp;&nbsp;&nbsp;&nbsp;

### Performance & Optimization

- **Feed:**
  - Implemented a Virtual List to optimize the rendering of feed posts.
- **General:**
  - Utilized Cloudnify for optimized image uploading and loading.
  - Leveraged Server-Side Rendering (SSR) for efficient page rendering.
  - Used lazy loading to reduce the bundle size.
  - Loaded third-party libraries using a service worker (Party Town).
  - Compressed images before uploading them. (on new post creation)
  - Loaded images with the appropriate size depending on the screen size.
- **Nginx:**
  - Used brotli to compress assets

### Security Concerns

  - Comprehensive form validation on the frontend.
  - Robust form validation in server actions.


## Installation

To run Twitter Clone locally, follow these steps:

1. Clone the project repository to your local machine.
2. Setup .env.local (you need clerk)
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_CLERK_WEBHOOK_SECRET=your_webhook_secret
```
2. Run The following commands to start the application.
```bash
npm i
npm run start
```

Once the application is built and launched, access it by visiting [http://localhost:3000](http://localhost:3000) in your web browser. If you encounter any issues during installation, please let me know.


## Contributing

Contributions and feedback are welcome! Please feel free to create issues or submit pull requests to help improve this project.

---

**Disclaimer:** This project, Twitter Clone, is created for educational purposes and is not affiliated with Twitter or any other social media platform.
