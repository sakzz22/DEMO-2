// import { Link } from "react-router-dom"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
// import SuggestedUser from "../components/SuggestedUsers";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const showToast = useShowToast();
    useEffect(() => {
        const getFeedPosts = async () =>{
            setLoading(true);
            setPosts([]);
            try {
                const res = await fetch("/api/posts/feed");
				const data = await res.json();
                if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
                console.log(data);
                setPosts(data);
              
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
				setLoading(false);
			}
        }
        getFeedPosts();
    },[showToast]);
    return (
      // <Link to={"/markhenson"}>
      //     <Flex w={"full" } justifyContent={"center"}>
      //         <Button mx={"auto"}>Visit Profile Page</Button>
      //     </Flex>
      // </Link>
      <Flex alignItems={"flex-start"} gap={10}>
        <Box flex={70} >
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )} 

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )} 
        {posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
        </Box>
        <Box flex={30} 
        display={{
          base:"none",
          md:"block",
          
        }}>
          <SuggestedUsers/>
        </Box>
      </Flex>
    );
};

export default HomePage;