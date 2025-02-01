# In-Browser Markdown Editor App

This project is an in-browser markdown editor built using React, Vite, and Tailwind CSS, integrated with Contentful CMS. It provides users the ability to create, update, and delete markdown files. It also includes user authentication (registration and login), allowing users to securely access their markdown content.

This app was built as a challenge from the [Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9) platform, and all credits for the design and idea go to them. 

[UI](https://axseinga-inbrowser-markdown-editor.netlify.app/)

## Test Account

Account can be created with any fake email & pass.

## Features

- **Markdown Editing**: Create and edit markdown files with a live preview.
- **User Authentication**: Register and login functionality with bcrypt for password hashing.
- **Content Management**: Integrates with Contentful for storing markdown files.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **State Management**: Uses Zustand for efficient state management.
- **Form Handling**: Uses React Hook Form and Zod for form validation.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Zustand**: For state management.
- **Tailwind CSS**: For styling.
- **Contentful**: For content management.
- **React Hook Form**: For form handling.
- **Zod**: For schema validation.
- **Netlify Functions**: For serverless functions.

## Getting Started

### Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/in-browser-markdown-editor-app.git
cd in-browser-markdown-editor-app
```

```shell
nvm use # uses supported Node version for this project
cp env.example .env
npm install
npm start
```

### Contentful schema for content types used

**markdown**

```
"fields": [
    {
      "id": "createdAt",
      "name": "Created At",
      "type": "Date",
      "required": true,
    },
    {
      "id": "name",
      "name": "Entry Title",
      "type": "Text",
      "required": true,
    },
    {
      "id": "content",
      "name": "Content",
      "type": "RichText",
      "required": true,
    },
    {
      "id": "author",
      "name": "Author",
      "type": "Link",
      "linkType": "Entry",
      "required": true,
    }
  ]
  ```

  **user**

  ```
    "fields": [
    {
      "id": "email",
      "name": "Email",
      "type": "Text",
      "required": true,
    },
    {
      "id": "password",
      "name": "Password",
      "type": "Text",
      "required": true,
    },
    {
      "id": "name",
      "name": "Name",
      "type": "Text",
      "required": true,
      "localized": false
    },
  ]
  ```