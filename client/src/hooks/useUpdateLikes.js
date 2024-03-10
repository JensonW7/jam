const useUpdateLikes = () => {
  const updateLikes = async (username, songId) => {
    try {
      const response = await fetch(`/api/current_songs/${username}/update-likes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: username,
          songId: songId
         })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error updating likes:', error);
      throw error;
    }
  };

  return { updateLikes };
};


export default useUpdateLikes;
