import axiosInstance from '../../../helpers/backend_helper';

const createBlog = async (title, content, backgroundImage) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('backgroundImage', backgroundImage);

    const response = await axiosInstance.post('api/v1/blogs/createBlog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export default createBlog;
