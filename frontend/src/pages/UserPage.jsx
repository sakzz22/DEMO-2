import { useState } from "react"
import UserHeader from "../components/UserHeader"
// import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {

  const { user, loading } = useGetUserProfile();
  const {username} = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  // const [loading,setLoading] = useState(false);
  // const [user,setUser]=useState(null)

  useEffect(() => {

    // const getUser = async () => {
    //   try {
    //     const res = await fetch(`/api/users/profile/${username}`);
    //     const data =await res.json();
    //     if (data.error){
    //       showToast("Error" , data.error , "error");
    //       return;
    //     }    
    //   } catch (error) {
    //     showToast("Error", error.message, "error");
    //   }finally {
		// 		// setLoading(false);
		// 	}
    // };

    const getPosts = async () => {
      // if (!user) return;   // might be del
      if(!user) return; //12.03
			setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);  //might del
      }finally {
				setFetchingPosts(false);
			}
    }

    // getUser();
    getPosts();
  },[username , showToast , setPosts , user]);
  console.log("post is here",posts);
  

  if(!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    )
  }

  if (!user && !loading) return <h1>User Not Found</h1>;


  return (
    <>
    <UserHeader user={user} />
    {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}
      {posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
    </>
  );
};

export default UserPage;