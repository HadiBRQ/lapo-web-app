import axiosInstance from '../../../helpers/backend_helper';

const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/blogs/getBlogById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

export default getBlogById;
