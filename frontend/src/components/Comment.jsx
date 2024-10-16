
// import { Avatar, Divider, Flex,Text } from "@chakra-ui/react";


// const Comment = ({reply}) =>{
    
//     return(
//         <>
//         <Flex  gap={4} py={2} my={2} w={"full"}>
//             <Avatar src={reply.userProfilePic}/>
//             <Flex gap={1} w={"full"} flexDirection={"column"}>
//                 <Flex  w={"full"} justifyContent={"space-between"} alignItems={"center"}>
//                     <Text fontSize={"small"} fontWeight="bold">{reply.username}</Text>
                    
//                 </Flex>
//                 <Text>{reply.text}</Text>
               
//             </Flex>
//         </Flex>
//         <Divider my={4}/>
//         </>
//     )
// }
// export default Comment;

import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={reply.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{reply.username}
						</Text>
					</Flex>
					<Text>{reply.text}</Text>
				</Flex>
			</Flex>
			{!lastReply ? <Divider /> : null}
		</>
	);
};

export default Comment;