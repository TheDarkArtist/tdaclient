import {useEffect, useState, useRef} from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAlertContext } from '../../contexts/AlertContext';

import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/Firebase';


const About = () => {

  const {currentUser } = useAuth();
  const {alert, showAlert} = useAlertContext();

  const skills = [
    ['Languages', 'Frameworks', 'Personal',],
    ['python', 'django', 'Problem-Solving'],
    ['javascript', 'react.js', 'Strategic Thinker'],
    ['rust', 'flask', 'Detail-Oriented'],
    ['dart', 'flutter','Resourcefull'],
    ['typescript','TailwindCSS','Collaborative'],
    ['C','Bootstrap',''],
    ['SQL','Firebase',''],
  ]

  const nameRef = useRef();
  const emailRef = useRef();
  const msgRef = useRef();
  const bottomRef = useRef();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
    const docRef = addDoc(collection(db, 'messages'),{
        name: nameRef.current.value,
        email: emailRef.current.value,
        msg: msgRef.current.value,
        createdAt: serverTimestamp(),
      });
      nameRef.current.value = '';
      emailRef.current.value = '';
      msgRef.current.value = '';
    }catch(error){
     console.log('Error on message submit ::==> ', error);
    }
    showAlert('Message Sent!');
  }

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView(
      {
        behavior: 'smooth',
      }
    )
  }

  const handleResumePrint = () =>{
    var printContent = document.getElementById('resume').innerHTML
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
     window.print()
    document.body.innerHTML = originalContent;
  }

  return (
    <div className='flex flex-col items-center '>

      <div className='flex justify-between items-center h-10 w-full bg-gradient-to-tl from-green-900 via-green-700 to-green-800 mb-2 px-4'>
        <div className='font-bold'>WHOAMI</div>
        <div>
          <span className='px-1 cursor-pointer hover:text-red-900 md:hidden' onClick={scrollToBottom}>Contact</span>
          <span onClick={handleResumePrint} className='px-2 cursor-pointer hover:text-red-900' >Download</span>
        </div>
      </div>
      <div className='w-full flex flex-col-reverse md:flex-row items-center md:items-stretch  lg:w-[80%]' >

        <div className='flex p-4 flex-col w-[95%] md:w-[40%] border-blue-800 shadow-md mt-6 md:mt-0 shadow-blue-800 '>
          <div className='text-xl font-bold text-blue-700'>Contact Me..</div>
          <div className='text-sm py-2 text-blue-700' >For signed in users, email and name will be autofilled!</div>
          <div>
            <form onSubmit={handleSubmit} >
            <input required ref={nameRef} defaultValue={currentUser && currentUser.name.first +' '+ currentUser.name.last} className='my-2 w-full p-2 bg-blue-200 dark:bg-blue-950 border border-blue-600 focus:outline-none' type="text" placeholder='Name' />
            <input required ref={emailRef} defaultValue={ currentUser && currentUser.email} className='my-2 w-full p-2 bg-blue-200 dark:bg-blue-950 focus:outline-none border border-blue-600' type="email" required placeholder='Email' />
            <textarea required ref={msgRef}  className='my-2 w-full p-2 bg-blue-200 dark:bg-blue-950 line-none border border-blue-600' name="about-contact-msg" id="about-contact-msg" cols="30" rows="10" placeholder='Shoot...'></textarea>
            <div className='w-full flex justify-end'><button ref={bottomRef} className='bg-green-700 hover:bg-green-800 my-2 p-1 focus:outline-none w-20 text-green-200' >Send</button></div>
            </form>
          </div>
          <div className='mt-4 flex flex-wrap'>
            <a href='https://facebook.com' target='_blank' className="border border-blue-400 flex m-2 items-center justify-center my-1 p-1 focus:outline-none bg-blue-700 w-40 hover:bg-blue-800 text-blue-200">Facebook</a>
          </div>

        </div>

        <div id='resume' className='flex flex-col border-blue-400 w-full md:w-[60%] rounded shadow-lg shadow-blue-950' >

          <div className='border border-blue-800 rounded-b m-2'>
            <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-900 to-cyan-900 flex items-center font-bold text-blue-200'>Personal Details</div>
            <div className='p-2 flex flex-col text-sm bg-gray-300 dark:bg-transparent dark:text-stone-300'>
              <span>Kushagra Sharma</span>
              <span>Ashirwad Garden, Rest House Road, Rajgarh, Alwar</span>
              <span> <a href='mailto:tda@thedarkartist.in' >  tda@thedarkartist.in </a> | +917426072284</span>
              <span>June 2, 2005</span>
              <span>TheDarkArtist.in</span>
              <span>LinkedIn TheDarkArtist</span>
            </div>
          </div>

          <div className='border border-blue-800 rounded-b m-2'> <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-700 to-cyan-900 flex items-center font-bold text-blue-200'>Objective</div>
            <div className='border-blue-400 dark:text-stone-300 p-2'>
              On a quest for perfection in the digital realm, I'm geared up to collaborate with brilliant minds. Eager to architect, design, and breathe life into software, my journey is fueled by a commitment to continuous learning. With a hunger for mastering new technologies, I bring a deep understanding of cyber security, ensuring that our innovative solutions not only push boundaries but also stand as fortresses against digital threats. Let's make coding dreams a pixel-perfect reality while prioritizing the utmost integrity and resilience in our cyber defenses. Ready to dive into the world of endless possibilities!</div>
          </div>
          <div className='border border-blue-800 rounded-b m-2'>
            <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-700 to-cyan-900 flex items-center font-bold text-blue-200'>Education</div>
            <div className='border-blue-400 p-2 text-sm'>
              <ul className='list-disc pl-4 dark:text-stone-300' >
                <div className='py-1 ' >
                  <li>10<span className='align-super' >th</span> Class  <span className="pl-4">2017-2018</span></li>
                  <p>Swami Ganga Bharti Sr. Sec. School, Rajgarh, Alwar</p>
                </div>

                <div className='py-1'>
                  <li>12<span className='align-super' >th</span> Class  <span className="pl-4">2019-2020</span></li>
                  <p>JEE Mains Prep from Resonance, Jaipur</p>
                </div>

                <div className='py-1'>
                  <li>B.Tech Computer Scinece & Engineering <span className="pl-4">2020-2024</span></li>
                  <p>Modern Institute of Technology & Research Center, Alwar, Rajasthan</p>
                </div>
              </ul>
            </div>
          </div>

          <div className='border border-blue-800 rounded-b m-2'>
            <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-700 to-cyan-900 flex items-center font-bold text-blue-200'>Experience</div>
            <div className='border-blue-400 p-1 dark:text-stone-300'> Student </div>
          </div>


          <div className='border border-blue-800 rounded-b m-2'>
            <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-700 to-cyan-900 flex items-center font-bold text-blue-200'>Skills</div>
            <div className='border-stone-400 p-2 overflow-x-scroll dark:text-stone-300'>
              <table>
                <thead>
                  <tr >
                    {skills[0].map((header, index) => (
                      <th className='px-2 border-l border-b border-stone-500' key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skills.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td className='px-2 border-l border-stone-500' key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='border border-blue-800 rounded-b m-2'>
            <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-700 to-cyan-900 flex items-center font-bold text-blue-200'>Interests</div>
            <div className='border-blue-400 p-2 dark:text-stone-300'>
              <p>
                Passionate about exploring the intricate world of hacking, programming, and artificial intelligence. My curiosity extends beyond the digital realm, delving into philosophy to understand the underlying principles shaping our technological landscape. </p>
              <p>As a perpetual learner, I thrive on dissecting complex problems and finding innovative solutions. In my free time, I indulge in the art of software development. Always up for a challenge, I find inspiration in the pursuit of perfection, both in code and in the broader spectrum of life.
              </p>

            </div>
          </div>

          <div className='border border-blue-800 rounded-b m-2'>
            <div className='w-full h-7 bg-gradient-to-tl px-4 from-cyan-900 via-blue-700 to-cyan-900 flex items-center font-bold text-blue-200'>Achievements & Certs</div>
            <div className='border-blue-400 p-2 dark:text-stone-300'>
              <p>Smart India Hackathon 2022 Finalist</p>
              <p>Javascript cert by HackerRank</p>

            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default About
