// import SignupCard from "../components/SignupCard"
import { useRecoilValue } from "recoil"
import LoginCard from "../components/LoginCard"
import authScreenAtom from "../atoms/authAtom"
import SignupCard from "../components/SignupCard";
// import { useState } from "react";


const AuthPage = () =>{
    const authScreenState = useRecoilValue(authScreenAtom);
    // const [value , setValue]  = useState("login");
    console.log(authScreenState);
    
  return (
    <>
    {/* <SignupCard/> */}
    {/* <LoginCard/> */}
    {authScreenState === "login" ? <LoginCard/> : <SignupCard/>}
    </>
  )
}

export default AuthPage