import React, { useEffect, useState } from "react";

import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { MdEdit } from "react-icons/md";

const md = `
# Welcome to [Your Name]'s GitHub Profile! 👋

I'm a passionate [hacker/software developer/whatever fits you] who loves diving deep into code and exploring new technologies. Welcome to my corner of the GitHub universe! Here's a little bit about me:

- 🚀 Currently working on [current_project_name]
- 💡 Exploring [interesting_tech_topic]
- 🌱 Learning [new_language_or_framework]
- 💬 Ask me about [your_areas_of_expertise]

## About Me ℹ️

I'm [Your Name], a [your_role_or_specialization] based in [your_location]. With [number_of_years_experience] years of experience in [relevant_technologies_or_industries], I'm passionate about [your_passions_or_interests].

## Projects 🛠️

Here are a few projects I'm proud of:

- [Project 1 Name](link_to_project_1) - Brief description of the project.
- [Project 2 Name](link_to_project_2) - Brief description of the project.
- [Project 3 Name](link_to_project_3) - Brief description of the project.

## Connect with Me 🌐

- [LinkedIn](link_to_your_linkedin_profile)
- [Twitter](link_to_your_twitter_profile)
- [Personal Website/Blog](link_to_your_website_or_blog)

Feel free to reach out if you have any questions, suggestions, or just want to connect!

## My Stats 📊

![Your Name's GitHub Stats](https://github-readme-stats.vercel.app/api?username=your_username&show_icons=true&theme=dark)

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=IAmKushagraSharma&layout=compact&theme=dark)

## Thanks for Visiting! 🙏

Thanks for stopping by! Feel free to explore my repositories and don't hesitate to reach out if you have any questions or just want to connect. Happy coding! 🚀`;

const UserBio = () => {
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);

    useEffect(()=>{
        setBio(md)
    },[])

  return (
    <div className="md:w-[68%] w-full border border-stone-500 rounded-md my-4">
      <div className="flex justify-between items-center py-2 px-3 w-full">
        <span className="text-sm">tda/bio</span>
        {!edit ? (
          <MdEdit
            onClick={() => setEdit(!edit)}
            className="h-5 w-5 cursor-pointer"
          />
        ) : (
          <div
            onClick={() => setEdit(!edit)}
            className="border border-green-900 rounded-md px-4 cursor-pointer py-0.5 bg-green-950"
          >
            Done
          </div>
        )}
      </div>
      {edit ? (
        <MarkdownEditor desc={bio} setDesc={setBio} />
      ) : (
        <div className="p-4">
          <MarkdownRenderer content={bio} />
        </div>
      )}
    </div>
  );
};

export default UserBio;
