import { Avatar, AvatarBadge, Flex, Stack, useColorModeValue, WrapItem, Text, Image, useColorMode, Box, } from '@chakra-ui/react'
// import React from 'react'
import userAtom from "../atoms/userAtom";
import {  useRecoilState, useRecoilValue } from "recoil";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { selectedConversationAtom } from '../atoms/messagesAtom';
//, BsFillImageFill

const Conversation = ({conversation , isOnline}) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const colorMode = useColorMode();

  console.log("selectedconversation", selectedConversation);
  
  return (
   <Flex   gap={4}
   alignItems={"center"}
   p={"1"}
   _hover={{
       cursor: "pointer",
       bg: useColorModeValue("gray.600", "gray.dark"),
       color: "white",
   }}
   onClick={() => setSelectedConversation({
    _id: conversation._id,
    userId: user._id,
    userProfilePic: user.profilePic,
    username: user.username,
    mock: conversation.mock,
  }) }
  bg={
    selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
  }
   borderRadius={"md"}
   > 
   <WrapItem>
   <Avatar
					size={{
						base: "xs",
						sm: "sm",
						md: "md",
					}}
					src={user.profilePic}
				>
          {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : "" }
					{/*  */}
				</Avatar>
			
    </WrapItem>

    <Stack direction={"column"} fontSize={"sm"} gap={2} >
       <Text fontWeight='700' display={"flex"} alignItems={"center"}>
        {user.username} <Image src="/verified.png" width={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
        {currentUser._id === lastMessage.sender ?(
          <Box color={lastMessage.seen ? "blue.400" : ""}>
            <BsCheck2All size={16}/>
          </Box>
        ) :""}
        {lastMessage.text.length > 18 ? lastMessage.text.substring(0,18) + "..." : lastMessage.text || <BsFillImageFill size={16}/>}
        </Text>  
    </Stack>
    </Flex>
  )
}

export default Conversation;