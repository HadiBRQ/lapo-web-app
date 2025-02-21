import axiosInstance from '../../../helpers/backend_helper';

const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get('api/v1/blogs/getAllBlogs');
    return response.data;
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    throw error;
  }
};

export default getAllBlogs;
