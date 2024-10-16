import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
// import { useToast } from "@chakra-ui/toast";
import useShowToast from "../hooks/useShowToast";
// import { Toast } from "@chakra-ui/react";
import {FiLogOut} from "react-icons/fi"

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const handleLogout = async() =>{
        
        try {
            
            const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
            const data = await res.json();
            console.log(data);
            if(data.error){
               showToast("Error" , data.error, "error");
               return;
            }
            
            localStorage.removeItem("user-threads");
            setUser(null);
            
        } catch (error) {
            console.log(error);           
        }

    }
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"medium"} onClick={handleLogout}>
    <FiLogOut size={30}/>
    </Button>
  );
};

export default LogoutButton;
