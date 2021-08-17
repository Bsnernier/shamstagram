import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPost, getOnePost } from "../store/post";

function Post() {
  const [description, setDescription] = useState("");
  const [imageId, setImageId] = useState("");
  const [userId, setUserId] = useState("");
  const { postId } = useParams();

  const dispatch = useDispatch();

  console.log(postId);

  useEffect(() => {
    dispatch(getOnePost(postId));
    console.log("INSIDE USE EFFECT ---------");
  }, [dispatch]);

  // useEffect(() => {
  //   setDescription(post.description);
  //   setImageId(post.imageId);
  //   setUserId(post.userId);
  // });

  const post = useSelector((state) => state.post);
  console.log("THIS IS THE POST ----------", post);

  return (
    <>
      <h1>Post</h1>
      <div>{description}</div>
      <img src={post.postUrl}></img>
      <div>{imageId}</div>
      <div>{userId}</div>
    </>
  );
}

export default Post;
