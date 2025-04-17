import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

const BlogList = ({ blogItem, fetchListOfBlogs }) => {
    const navigate = useNavigate();
    function handleEdit(currentBlogItem) {
        navigate("/add-blog", { state: { getCurrentBlogItem: currentBlogItem } });
    }
    async function handleDeleteBlog(getCurrentId) {
        const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrentId}`);
        const result = await response.data;
        if (result?.message) {
            fetchListOfBlogs();
        }
        toast.success("Successfully Deleted");
    }
    return (
        <div key={blogItem._id} className='p-10 border-2 border-slate-500 shadow-xl rounded-xl space-y-5'>
            <Toaster position='top-center' />
            <p>{blogItem.title}</p>
            <p>{blogItem.description}</p>
            <div className='flex space-x-6'>
                <FaEdit size={30} onClick={() => handleEdit(blogItem)} />
                <FaTrash size={30} onClick={() => handleDeleteBlog(blogItem._id)} />
            </div>
        </div>
    );
};

export default BlogList;