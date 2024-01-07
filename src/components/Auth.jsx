import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import Form from 'react-bootstrap/Form';
import { registerAPI } from '../services/allAPI';
import { loginAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';


function Auth({register}) {
    const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
    const [userData , setUserData] = useState({
        username:"",
        email:"",
        password:""
})
const navigate = useNavigate()
/*console.log(userData);*/
    const RegisterForm = register?true:false
//function to register
const handleRegister = async(e)=>{
    e.preventDefault()
    const {username,email,password} = userData

    if(!username || !email || !password){
        toast.info('please fill the form completely')
    }
    else{
       const result =  await registerAPI(userData)
       console.log(result);
       if(result.status===200){
        toast.success(`${result.data.username} registered successfully`)
        setUserData({
            username:"",email:"",password:""
        })
        navigate('/login')
       }
       else{
        toast.error(`${result.response.data}`)
       }
    }

}

//function to login
const handleLogin = async(e)=>{
    e.preventDefault()
    const {email,password} = userData

    
    if(!email || !password){
        toast.info('please fill the form completely')
    }
    else{
        const result =  await loginAPI(userData)
        console.log(result);
        if(result.status===200){
            setIsAuthToken(true)
            //store data
            //in session storage key:string,value:string
            sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
            sessionStorage.setItem("token",result.data.token)

            toast.success('login successfully')
            setUserData({
                username:"",email:"",password:""
            })
            setTimeout(()=>{
                navigate('/')
            },2000)
           
        }
        else{
            toast.error(result.response.data)
        }


    }
}
  return (
    <>
   <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
    <div className="w-75 container">
    <Link to={'/'} className='fs-5' style={{color:'blue',textDecoration:'none'}}><i class="fa-solid fa-arrow-left me-3"></i>Back To Home</Link>
    <div className="card shadow bg-success rounded p-5">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <img src='https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg' alt='no image' className='w-100'></img>
            </div>
            <div className="col-lg-6">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h1 className='text-light'><i class="fa-brands fa-stack-overflow fa-2x"></i>Project Fair</h1>
                <h5 className='text-light ms-5 mt-4'>
                    {
                   RegisterForm ? "Sign up to your Account":"Sign in to your Account"
                    }
                </h5>

                <Form className='w-100 p-5'>
                {RegisterForm &&
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} /> 
                </Form.Group>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter Email Id" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="password" placeholder="Enter Your Password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/> 
                </Form.Group>
                
                {RegisterForm?
                <div>
                <button onClick = {handleRegister} className='btn btn-warning mt-4'>Register</button>
                <p className='text-light'>Already a User?Click here to<Link to={'/login'}>Login</Link></p>
                </div>
                :
                <div>
                <button onClick = {handleLogin} className='btn btn-warning mt-4'>Login</button>
                <p className='text-light'>New User?Click here to<Link to={'/register'}>Register</Link></p>
                </div>
                }
                </Form>
                </div>
            </div>
        </div>
    </div>

    </div>

   </div>
   <ToastContainer theme='colored' autoClose={2000} position='top-center'/>
   </>
  )
}

export default Auth