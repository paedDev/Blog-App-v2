import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
const AddNewBlog = () => {
    const { formData, setFormData, setIsEdit, isEdit } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state?.getCurrentBlogItem) {
            setIsEdit(true);
            const { getCurrentBlogItem } = location.state;
            setFormData({
                title: getCurrentBlogItem.title,
                description: getCurrentBlogItem.description
            });
        }
    }, [location]);
    async function handleSaveBlogToDatabase() {
        if (!formData.title || !formData.description) {
            toast.error("Both Title and description are required");
        }
        try {
            const response = isEdit
                ? await axios.put(`http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`, {
                    title: formData.title,
                    description: formData.description,
                })
                : await axios.post("http://localhost:5000/api/blogs/add", {
                    title: formData.title,
                    description: formData.description,
                });
            const result = await response.data;

            if (result) {
                setIsEdit(false);
                setFormData({
                    title: "",
                    description: "",
                });
                {
                    isEdit ? toast.success("Blog edit successfully") : toast.success("Blog added successfully");
                }
                setTimeout(() => {
                    navigate("/");
                });
            }
        } catch (error) {
            console.error(`Error saving blog:`, error);
            toast.error("Something went wrong. Please try again");

        }


    }
    return (


        <div className='p-6 space-y-2'>
            <Toaster position='top-center' />
            <h1>{isEdit ? "Edit a blog" : "Add a blog"}</h1>
            <div className='flex flex-col w-md gap-5 bg-gradient-to-r from-slate-400 to-slate-700 text-white p-10 rounded-2xl shadow-xl'>
                <div className='flex'>
                    <input type="text" placeholder='Enter Blog title'
                        className='w-full outline-none placeholder:text-gray-300'
                        onChange={(e) => setFormData({
                            ...formData, title: e.target.value
                        })}
                        value={formData.title} />
                </div>
                <textarea name="description" placeholder='Enter Blog Description'
                    className='w-full outline-none placeholder:text-gray-300'
                    onChange={(e) => setFormData({
                        ...formData, description: e.target.value
                    })}
                    value={formData.description} >

                </textarea>
                <button onClick={handleSaveBlogToDatabase} className='bg-white py-1 rounded-xl text-gray-600 font-bold hover:scale-105 duration-500 '>
                    {isEdit ? "Edit Blog" : "Add Blog"}
                </button>
            </div>
        </div>
    );
};

export default AddNewBlog;