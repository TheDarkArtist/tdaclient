import { useAuth } from '../../contexts/AuthContext';



const ProfileView = ({ setEditProfile }) => {

  const { currentUser } = useAuth();

  return (
  <div className='flex justify-center md:justify-start w-full' > 
    <div className='w-full max-w-[25rem] lg:w-[25rem] ' >
      <div className='min-h-36 flex flex-col items-center justify-center' >
        <div className='flex w-[90%] my-8 items-center justify-evenly'>
          <div className='border rounded-[50%] h-20 w-20' ></div>
          <div className='flex flex-col' >
            <span className='text-3xl font-bold text-stone-300' >{currentUser && currentUser.name.first + ' ' + currentUser.name.last}</span>
            <span className='flex items-center ' >
              <span className='text-xl text-stone-400' >{currentUser && currentUser.username}</span> <span className='text-stone-400 pl-4' > {currentUser && currentUser.dob}</span>
            </span>
          </div>
        </div>
        <div className='flex w-[90%] mb-2 items-start'>
          <div className="px-2 text-stone-300">{currentUser && currentUser.bio}</div>
        </div>
      </div>


      <div className='w-full py-2 flex justify-center' >
        <button onClick={() => setEditProfile(true)} className='rounded-md border py-.5 w-[90%] border-stone-700 bg-zinc-900 text-stone-200' >Edit Profile</button>
      </div>


      <div>
        <div className=' flex flex-col text-sm pt-2 px-6 text-stone-300'>
          <span>{currentUser && currentUser.email}</span>
          <span>{currentUser && currentUser.phoneNumber}</span>
        </div>
      </div>

      <div className='flex flex-col text-sm pt-2 px-6 text-stone-300' >
        <span>{currentUser && currentUser.address.street}</span>
        <span>{currentUser && currentUser.address.city}</span>
        <span>{currentUser && currentUser.address.state}</span>
        <span>{currentUser && currentUser.zip}</span>

      </div>
    </div>
    </div>


  )
}


export default ProfileView;
