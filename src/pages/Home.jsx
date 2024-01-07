import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../image/image1.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../services/allAPI'

function Home() {

  const [islogin , setIsLogin] = useState(false)
  const [homeProject,setHomeProject] = useState([])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }

  },[])

  const getHomeProject = async()=>{
    const result = await homeprojectAPI()
    console.log(result.data);
    setHomeProject(result.data)
  }
  useEffect(()=>{
   getHomeProject()
  },[])
  return (
    <>
    <div style={{width:'100%',height:'100vh',backgroundColor:'yellowgreen'}}>
      <div className="container-fluid rounded">
        <Row className='align-items-center m-5'>
          <Col sm={12} md={6}>
          <h1 style={{fontSize:'80px',color:'white'}}>Project Fair</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        {islogin?
        <Link to={'/dashboard'} className='btn btn-success rounded'>Manage Project<i class="fa-solid fa-arrow-right ms-2"></i></Link>:

        <Link to={'/login'} className='btn btn-success rounded'>Get Started<i class="fa-solid fa-arrow-right ms-2"></i></Link>}
          </Col>
          <Col sm={12} md={6}>
            <img src={titleImage} alt="no image" className='w-75' style={{marginTop:'100px'}}></img>
          </Col>
        </Row>
       
      </div>

    </div>

    <div className='mt-5 all-project mb-5'>
      <h1 className='text-center'>Explore Our Projects</h1>
      <marquee scrollAmount={20} className='mt-5'>
      <div className='d-flex'>
        { homeProject?.length>0?
        homeProject?.map((item)=>(<div className='ms-5' style={{width:'500px'}}>
        <ProjectCard project={item}/>

      </div>))
          :null
        }

        
      </div>
      </marquee>
      <div className='text-center mt-5'> 
        <Link to={'./project'}>See More Projects</Link>
      </div>
      

    </div>
    </>
  )
}

export default Home