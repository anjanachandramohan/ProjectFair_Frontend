import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteUserprojectAPI, userprojectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'


function MyProject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const[userProject,setUserProject] = useState([])

  const getUserProject = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
   
    const result = await userprojectAPI(reqHeader)
    console.log(result.data);
    setUserProject(result.data)
  }

  useEffect(()=>{
  getUserProject()
  },[addProjectResponse,editProjectResponse])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteUserprojectAPI(id,reqHeader)
    console.log(result);
    if(result.status===200){
      getUserProject()
    }
    else{
      console.log(result.response.data);
    }
  }
  return (
    <div className='card-shadow p-3 me-3 ms-3'>
      <div className="d-flex">
        <h3 className='text-success ms-3'>My Project</h3>
        <div className="ms-auto">
          <AddProject/>
        </div>
      </div>
      <div className="mt-4">
       {userProject?.length>0? 
       userProject?.map((item)=>(<div className="border align-items-center rounded p-2 d-flex mb-3 bg-light">
          <h5>{item.title}</h5>

          <div className="icon ms-auto">
            <EditProject project={item}/>
            <a href={item.github} target='_blank' className="btn"><i class ="fa-brands fa-github text-success"></i></a>
            <button onClick={()=>handleDelete(item._id)} className="btn"><i class ="fa-solid fa-trash text-danger"></i></button>
          </div>
        </div>)):
        <p className="text-danger fs-3"><b>No Project Uploaded Yet !!</b></p>}
      </div>
    </div>
  )
}

export default MyProject