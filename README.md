
## Project Overview

Taking inspiration from Twitter, I embarked on this project for the purpose of learning and personal growth. It brings together the best of social media, allowing you to post updates, join conversations, and even create your own communities. Your account is protected with secure login options, and the platform ensures everything runs smoothly. It's a safe and engaging space for connecting with others, all while serving as a valuable learning experience

<img width="1343" alt="Screenshot 2023-10-23 at 23 43 57" src="https://github.com/hmellahi/Twitter-Clone/assets/47065280/786af78f-997e-4d94-8f81-d4d653131eb3">

## Technology Stack

This project employs a range of cutting-edge technologies:

<div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
  <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg" width="18" height="18" alt="Vue" />
  <span style="margin-left: 5px;"><strong>Next:</strong> Full stack Framework</span>
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
- **Profile Viewing:**
  - User can lookup other users
  - View other users profiles, including their posts and activity.
  - Current users can edit their own profiles.
### Community

  - Users can create communities.
  - Invite members via email to join a community.
  - Users can update/remove their communities.
  - Community admins can manage members' roles.

### Performance & Optimization

- **Feed:**
  - Implemented a Virtual List to optimize the rendering of feed posts.
  - Utilized Cloudnify for optimized image uploading and loading.
- **General:**
  - Leveraged Server-Side Rendering (SSR) for efficient page rendering.
  - Used Lazy loading to reduce the bundle size
- **Nginx:**
  - Used brotli to compress assets
  - Enabled http2


### Security Concerns

  - Comprehensive form validation on the frontend.
  - Robust form validation in server actions.

## Contributing

Contributions and feedback are welcome! Please feel free to create issues or submit pull requests to help improve this project.

---

**Disclaimer:** This project, Twitter Clone, is created for educational purposes and is not affiliated with Twitter or any other social media platform.
