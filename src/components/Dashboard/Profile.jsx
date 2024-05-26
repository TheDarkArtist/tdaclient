import { useState } from 'react'

import ProfileView from './ProfileView';
import EditProfile from './EditProfile';
import Analytics from './Analytics';


const Profile = () => {

  const [editProfile, setEditProfile] = useState(false)

  return (
    <div className='flex flex-wrap lg:flex-nowrap gap-2 pt-10'>

      {editProfile ? <EditProfile setEditProfile={setEditProfile} /> : <ProfileView setEditProfile={setEditProfile} />}

      <div className='flex items-center justify-center h-[88vh] w-full' >
        <Analytics />
      </div>

    </div>
  )
}

export default Profile;

