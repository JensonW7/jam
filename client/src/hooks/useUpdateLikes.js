const useUpdateLikes = () => {
  const updateLikes = async (username, songId) => {
    try {
      const response = await fetch(`/api/current_songs/${username}/update-likes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ songId })
      });
      console.log('Request URL:', url); // Log the URL to the console

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Optionally, you can handle the response here if needed

    } catch (error) {
      console.error('Error updating likes:', error);
      throw error;
    }
  };

  return { updateLikes };
};


export default useUpdateLikes;
