import axiosInstance from '../../../helpers/backend_helper';

const updateBlog = async (id, title, content, backgroundImage) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('backgroundImage', backgroundImage);

    const response = await axiosInstance.patch(`api/v1/blogs/updateBlog/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw error;
  }
};

export default updateBlog;
