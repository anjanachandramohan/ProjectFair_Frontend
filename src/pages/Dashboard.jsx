import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const [username , setUsername] =useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username);
  },[])
  return (
    <>
    <Header dashboard/>
    
    <h2 className='ms-3 mt-3'>Welcome <span className='text-warning'>{username}</span></h2>
    <Row className='container-fluid mt-5 mb-5'>
      <Col md={8}>
        <MyProject/>
      </Col>
      <Col md={4}>
        <Profile/>
      </Col>
    </Row>
    
    </>
    
  )
}

export default Dashboard