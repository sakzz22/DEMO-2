import { VStack, Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaInstagram } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { Button, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {Link as RouterLink} from 'react-router-dom';
import useFollowUnfollow from "../hooks/useFollowUnfollow";
// import { useState } from "react"; //11.43 we made a hook
// import useShowToast from "../hooks/useShowToast";

const UserHeader = ({user}) =>{
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom);
    const {following, updating , handleFollowUnFollow} = useFollowUnfollow(user);
    // const [following , setFollowing] = useState(user.followers.includes(currentUser?._id));
    // const [updating , setUpdating] = useState(false);//11.43
    // console.log(following);
    // const showToast = useShowToast();   //11.43
    
    const copyURL  = () =>{
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() =>{
            toast({
                title: 'Link.',
                description: "Profile link Copied",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
            
        })
        
    }
    // const handleFollowUnFollow = async() =>{ //11.43
    //   if(!currentUser){
    //     showToast("Error" , "Please Login To Follow" , "error");
    //     return;
    //   }
    //   if(updating) return;
    //   setUpdating(true);
    //   try {
    //   const res = await fetch(`/api/users/follow/${user._id}`,{
    //     method:"POST",
    //     headers:{
    //       "Content-Type":"application/json",
    //     }
    //   })
    //   const data = await res.json();
    //   if(data.error){
    //     showToast("Error" , data.error , "error");
    //     return;
    //   }

    //   if(following){
    //     showToast("Success" , `Unfollowed ${user.name}` , "success");
    //     user.followers.pop();

    //   }
    //   else{
    //     showToast("Success" , `Followed ${user.name}` , "success");
    //     user.followers.push(currentUser?._id); //adding followers
    //   }

    //   setFollowing(!following);
    //   console.log(data);
      
    //   } catch (error) {
    //     showToast("Error" , error , "error");  
    //   }
    //   finally{
    //     setUpdating(false);
    //   }
    // }
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={2}
              margin={2}
              borderRadius={"full"}
            >
              Linkz.next
            </Text>
          </Flex>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {user.profilePic && (
            <Avatar
            name={user.name}
            src={user.profilePic}
            size={
                {
                    base:"md",
                    md:"xl",
                }
            }
            objectFit={"cover"}
          />
          )}
           {!user.profilePic && (
            <Avatar
            name={user.name}
            src='https://bit.ly/broken-link'
            size={
                {
                    base:"md",
                    md:"xl",
                }
            }
            objectFit={"cover"}
          />
          )}
        </Box>
      </Flex>
      <Text>{user.bio} </Text>
      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
        <Button size={"small"} padding={2} margin={2} >
          Update Profile
        </Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (     
        <Button size={"small"} padding={2} margin={2} onClick={handleFollowUnFollow} isLoading={updating}>
          {following ? 'Unfollow' : "Follow"}
        </Button>
      )}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length}followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <FaInstagram size={30} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={30} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
            <Text fontWeight={"bold"}>Linkz</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
        <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
