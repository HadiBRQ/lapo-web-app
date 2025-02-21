import axiosInstance from '../../../helpers/backend_helper';

const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/v1/blogs/deleteBlog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error;
  }
};

export default deleteBlog;
