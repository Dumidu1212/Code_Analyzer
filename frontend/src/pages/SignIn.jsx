import React,{useState} from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import {useNavigate} from "react-router-dom"
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import Footer from '../components/Footer';

const SignIn = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [recapcha, setRecapcha] = useState(null)
  
    const handleSignin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        // console.log(responseData.headers);
        console.log([...response.headers.entries()]);
        console.log(responseData);
        if (responseData.status) {
          navigate("/home");
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have successfully login to the system.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          alert(
            "There was a problem with your Login . check your email or password"
          );
        }
        // if (responseData.type === "deactivated") {
        //   navigate("/deactivatedmsg");
        // }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
  
  // const signInWithGoogle =async()=>{
      
  //   signInWithPopup(auth,authProvider).then((result) => {
  //     // Handle successful sign-in
  //    console.log(result)
  
  //    axios.post("http://localhost:8080/auth/google",{
  //     username : result.user.displayName,
  //     email : result.user.email,
  //     profileimg : result.user.photoURL,
  //     mobilenumber:result.user.phoneNumber
  
  //    }).then(res=>{
  //     console.log(res.data)
  //     if(res.data.status){
  //       navigate('/home')
  //     }
  //    }).catch(err=>{
  //     console.log(err)
  //    })
  
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error(error);
      
  //   });
  
  
  // }
  
  const onChange = (value)=>{
  
  setRecapcha(value);
    console.log(value)
  }



  return (
   <>
    <Header />
      <NavBar />
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundColor: "  ",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-lg  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-8 border-solid" onSubmit={handleSignin}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgotpassword"
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Forgot Password?
              </a>
            </div>
            <div className='w-full h-auto'>
            <ReCAPTCHA
  
    sitekey="6LdF7tQpAAAAAMQFEo3q0ObrHqa7w3DJI7j-oLyW"
    onChange={onChange}

  />
  </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={!recapcha}
           >
              Login to your account
            </button>
       
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="/Signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
       <Footer/>
   </>
  )
}

export default SignIn