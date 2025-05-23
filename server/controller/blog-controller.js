import mongoose from "mongoose";
import Blog from "../model/blog.js";

//lets do the all this following :
//fetch
//add
//delete
//update

//fetch
export const fetchListOfBlogs = async (req, res) => {
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
//add
export const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }
  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });
  try {
    await newlyCreatedBlog.save();
    return res.status(200).json({ newlyCreatedBlog });
  } catch (err) {
    console.error(`Error saving Blog: `, err);
    return res.status(500);
  }
};
//update
export const updateABlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;

  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong while updating! Please try again",
    });
  }
  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ currentBlogToUpdate });
};
//delete
export const deleteABlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Unable to delete! Please try again" });
  }
};
