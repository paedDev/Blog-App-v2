import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context';
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import BlogList from '../../components/BlogList/BlogList';
const Home = () => {
    const { blogList, setBlogList, loading, setLoading } = useContext(GlobalContext);

    async function fetchListOfBlogs() {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/blogs");
        const result = await response.data;
        console.log(result);
        if (result && result.blogList && result.blogList.length) {
            setBlogList(result.blogList);
            setLoading(false);
        } else {
            setLoading(false);
            setBlogList([]);
        }

    }
    useEffect(() => {
        fetchListOfBlogs();
    }, []);
    return (
        <div className='max-w-8xl mx-auto p-8 space-y-5'>

            <h1>Blog Lists</h1>
            {
                loading ? (<h1>Loading Blogs! Please wait</h1>) : (
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
                        {blogList && blogList.length ?
                            blogList.map((blogItem) => (
                                <BlogList blogItem={blogItem} fetchListOfBlogs={fetchListOfBlogs} />
                            ))
                            : (<h3>No Blogs Added</h3>)}

                    </div>
                )
            }
        </div>
    );
};

export default Home;