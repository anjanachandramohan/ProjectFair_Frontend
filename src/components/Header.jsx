import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';


function Header({dashboard}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setIsAuthToken(false)
  }
  return (
    <Navbar className="bg-success p-3">
        <Container>
            <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand className='text-light'>
          <i class="fa-brands fa-stack-overflow fa-2x"></i>{' '}
           <span className='fs-3'>Project Fair</span>
          </Navbar.Brand>
          </Link>
          {
            dashboard &&
            <button onClick={handleLogout} className='btn btn-warning'>Logout<i class="fa-solid fa-power-off"></i></button>
          }
        </Container>
      </Navbar>
  )
}

export default Header