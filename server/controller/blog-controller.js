import mongoose from "mongoose";
import Blog from "../model/blog.js";

//lets do the all this following :
//fetch
//add
//delete
//update

export default fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (err) {
    console.log(err);
  }
  if (!blogList) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogList });
};
