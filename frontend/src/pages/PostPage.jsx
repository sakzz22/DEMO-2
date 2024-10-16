import { Avatar, Flex ,Text,Image,Box, Divider, Button, Spinner} from "@chakra-ui/react";
import Action from "../components/Action";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import Comment from "../components/Comment";



const PostPage = () =>{
  // const [liked,setLiked] = useState(false)  //clr
  const { user, loading } = useGetUserProfile();
  // const [post, setPost] =useState(null); //7.08
  const [posts,setPosts] = useRecoilState(postsAtom); //7.7
 
  const showToast = useShowToast();
  const { pid } = useParams()
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const currentPost =posts[0];

  useEffect(() => {
    const getPost = async () =>{
      setPosts([]); //7.19
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        			if (data.error) {
        				showToast("Error", data.error, "error");
        				return;
        			}
              console.log(data);
				      // setPost(data); 7.08
              setPosts([data]);

      } catch (error) {
        useShowToast("Error", error.message, "error");
      }
    }
    getPost()
  },[showToast,pid,setPosts])

  const handleDeletePost = async () =>{
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch(`/api/posts/${currentPost._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
			navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  if(!user && loading) {
    return(
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    );
  }
  if(!currentPost) return null;
  console.log("currentPost", currentPost);
  
  return <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name="Mark henson"/> 
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold" } >{user.username}</Text>
            <Image src="/verified.png" w={4} h={4} ml={4}/>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
					<Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
						{formatDistanceToNow(new Date(currentPost.createdAt))} ago
					</Text>

					{currentUser?._id === user._id && (
						<DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
					)}
				</Flex>
      </Flex>
      <Text  my={3}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src="bob" w={"full"}/>
      </Box>
      )}
    
      <Flex gap={3} my={3}>
        <Action post={currentPost}/>
      </Flex>
      
      <Divider my={6} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like,reply and post</Text>
        </Flex>
        <Button >
          Get
        </Button>
      </Flex>
      <Divider my={6}/>
      {/* <Comment/> */}
      {/* <Comment/> */}
      {currentPost.replies.map((reply) => (
				<Comment
					key={reply._id}
					reply={reply}
					lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
				/>
			))} 
  </>
}; //6.48

export default PostPage;