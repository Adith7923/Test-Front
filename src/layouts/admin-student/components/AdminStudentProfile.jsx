import React from 'react'
import ShowCards from '../../common/components/ShowCards'
import ShowData from './ShowData'

const AdminStudentProfile = () => {
  return (
    <div>
        <ShowCards {...ShowData}/>
    </div>
  )
}

export default AdminStudentProfile;