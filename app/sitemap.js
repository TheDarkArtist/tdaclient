export default function sitemap() {
  return [
    {
      url: "https://thedarkartist.in",
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://thedarkartist.in/about",
      changeFrequency: "monthly",
      priority: 0.8,
    },
         {
      url: 'https://thedarkartist.in/resume',
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: "https://thedarkartist.in/projects",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://thedarkartist.in/blog",
      changeFrequency: "weekly",
      priority: 0.5,
    },
         {
      url: 'https://thedarkartist.in/auth/signup',
      changeFrequency: 'weekly',
      priority: 0.5,
    },
         {
      url: 'https://thedarkartist.in/auth/signin',
      changeFrequency: 'weekly',
      priority: 0.5,
    },
   {
      url: 'https://thedarkartist.in/about/contact-me',
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
