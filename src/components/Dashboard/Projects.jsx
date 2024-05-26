import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContext';
import Search from '../utils/Search';
import { db } from '../../services/Firebase';

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const {currentUser} = useAuth();
  const projectsHeader = [<input type="checkbox" />, 'No.', 'Title', 'Action']

  useEffect(() => {
    const fetchProjects = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'projectBlog'))
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() })
        })
       setProjects(list);
      } catch (error) {
        console.log(error)
      }
    }

    fetchProjects();
  }, [projects])



  if(currentUser.access != 'root'){
    return(
    <div className='h-96 flex justify-center items-center' >
      <span className='md:text-2xl'>You Are Not Authorized To Access This Area.</span>
    </div>
    )
  }

  const handleDelete = async (id) =>{
    await deleteDoc(doc(db, 'projectBlog', id))
  }

  const onSearch = () =>{
    console.log('Dashboard >> contact >> serach()')
  }


  return (
    <div className='min-h-[80vh] mt-10 w-full ' >
      <div className='w-full flex justify-center py-4'><Search parameter={'projects'} onSearch={onSearch} searchField={'title'} setResults={setProjects} /></div>

      <div className='w-full text-sm md:text-lg flex flex-col items-center justify-center my-10' >

        <div className='bg-green-950 border border-green-900 h-10 w-full flex justify-between items-center px-2 mx-2 md:w-[80%]' >
          <span className='mx-2 font-bold text-lg'>Project Blogs</span>
          <div className='p-2 underline text-blue-500' >
            <span className='mx-2 cursor-pointer'>delete</span>
          </div>
        </div>

        <div className='w-full text-green-400 md:w-[80%]' >
          <div className='mx-.5 overflow-y-auto overflow-x-auto ' >
            <table className='w-full border-collapse ' >
              <thead>
                <tr className='border'>
                  {projectsHeader.map(header => (
                    <td className='p-2 border border-green-900'>{header}</td>
                  ))
                  }
                </tr>
              </thead>
              <tbody>
                {projects ? projects.map((project, index) => [
                  <tr key={index} >
                    <td className='p-2 border border-green-900' ><input className='accent-green-700 ' type="checkbox" /></td>
                    <td className='p-2 border border-green-900 ' >{index}</td>
                    <td className='p-2 border border-green-900 ' >{project.title}</td>
                    <td className='p-2 border text-right border-green-900 underline text-blue-500' >
                      <a href={`projects/details/${project.id}`}><span className='mx-2 cursor-pointer'>view</span></a>
                      <a href={`projects/update/${project.id}`}><span className='mx-2 cursor-pointer'>update</span></a>
                      <span onClick={()=>handleDelete(project.id)} className='mx-2 cursor-pointer'>delete</span>
                    </td>
                  </tr>
                ]) : 'no projects'}

              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  )
}


export default Projects
