import React,{useState} from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import {useNavigate} from "react-router-dom"
import Footer from '../components/Footer'

const SignUp = () => {

  const [userName , setUsername] =useState('');
  const [email , setEmail] =useState('');
  const [password , setPassword] =useState('');
  const [mobileNumber , setMobilenumber] =useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobilenumberError, setMobilenumberError] = useState('');
  const [occupation,setOccupation] = useState('');
  const navigate = useNavigate();
  
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setMobilenumberError('');
  
    let isValid = true;
  
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }
    if (!/^\d+$/.test(mobileNumber)) {
      setMobilenumberError('Mobile Number must contain only digits');
      isValid = false;
    }
  
     if(mobileNumber.length < 10 || mobileNumber.length>10){
       setMobilenumberError('Mobile Number must be at least 10 characters long');
       isValid=false
  
     } 
  
    if (!isValid) {
      return;
    }
  
  
  
    try {
        const response = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                userName: userName, 
                email, 
                password, 
                mobileNumber,
                occupation 
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.status){
          alert("you have successfully registerd  !")
          navigate('/signIn');
        }else{
          alert("you have already registered")
        }
  
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  


  return (
    <>
     <Header/>
      <NavBar />
      <div
        className="flex justify-center items-center h-screen"
        style={{
         // backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        
         
        }}
      >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSignup}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign Up 
            </h5>
            <div>
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 User Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder='Kris Gale'
                required
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 Email
              </label>
              <input
                type="email"
                name="email"
                id="password"
                placeholder="eg : you@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
               {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
           
            <div>
              <label
                htmlFor="mobileNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="0770000001"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setMobilenumber(e.target.value)}
              />
                 {mobilenumberError && (
                <p className="text-red-500 text-sm mt-1">
                  {mobilenumberError}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="occupation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                placeholder="Developer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e)=>setOccupation(e.target.value)}
              />
                
              
            </div>
           
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up 
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account ?{" "}
              <a
                href="/signIn"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                sign in 
              </a>
            </div>
          </form>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default SignUp