import axiosInstance from '../../../../helpers/backend_helper';

const updateBlacklist = async (images, youtubeLink, titleText, subText) => {
  try {
    // Create a new FormData instance to hold the form data
    const formData = new FormData();
    if (images && images.length > 0) { 
      images.forEach((image) => { 
          formData.append('images', image); // 'images' should be the same key for each file 
      }
    ); 
  }
    formData.append('youtubeLink', youtubeLink); // Append the youtubeLink
    formData.append('titleText', titleText); // Append the titleText
    formData.append('subText', subText); // Append the subText

    // Cross-checking each value
    for (let [key, value] of formData.entries()) { 
      if (value instanceof File) { 
        console.log(`${key}: ${value.name}, ${value.size} bytes, type: ${value.type}`); 
      } else { 
        console.log(`${key}: ${value}`); 
      } 
    }

    // Make the PATCH request to update the blacklist details
    const response = await axiosInstance.patch('/api/v1/contents/updateBlacklist/1', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file upload
      },
    });

    console.log('Blacklist updated successfully:', response.data);
    return response.data.data.blacklist; // Return the updated blacklist object
  } catch (error) {
    console.error('Error updating blacklist:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default updateBlacklist;
