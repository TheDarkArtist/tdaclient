# Personal Portfolio

A personal portfolio website built with Next.js, Tailwind CSS, and other libraries for showcasing projects, writing blogs in Markdown format, and enabling recruiters to contact you.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Showcase](#project-showcase)
- [Blogging](#blogging)
- [Contact](#contact)
- [Contributing](#contributing)
- [License](#license)

## Features

- Showcase your projects with detailed descriptions and links.
- Write and publish blogs using Markdown.
- Contact form for recruiters or visitors to reach out to you.
- Personalized portfolio design with Tailwind CSS and React components.
- Smooth animations and transitions with Framer Motion.
- Dynamic routing and rendering with Next.js.
- Integration with Firebase for real-time database and authentication.
- Use of React Icons for adding icons to various components.
- Show loading spinner with React Loader Spinner while loading data.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-portfolio.git
```

2. Navigate to the project directory:

```bash
cd your-portfolio
```
## Installation

3. Install dependencies:

```bash
npm install
```

## Installation

1. Create a Firebase project and configure Firebase for authentication and real-time database.

2. Create a `.env.local` file in the root directory and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

```

## Usage

To start the development server, run:

```bash
npm run dev

```

## Usage

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Showcase

You can showcase your projects by adding them to the `projects.json` file in the `data` directory. Each project should have a title, description, image URL, and link to the project.

## Blogging

Write your blogs in Markdown format and save them in the `blogs` directory. Each blog should be in its own Markdown file and include front matter with metadata such as title, date, and author.

## Contact

Visitors can reach out to you using the contact form on the website. Messages will be sent to your Firebase database, where you can access and respond to them.

## Contributing

Contributions are welcome! Feel free to submit pull requests for bug fixes, feature enhancements, or documentation improvements.

## License

This project is licensed under the MIT License.

Feel free to use this Markdown text in your README.md file for your project.
````
