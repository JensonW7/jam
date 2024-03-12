const removeLike = async ( userToRemoveLike ) => {
    console.log('usertoddlike', userToRemoveLike)
    try {
        const response = await fetch('/api/current_songs/remove_like/' + userToRemoveLike, {
        method: 'PATCH'
        })
    } catch (error) {
        throw new Error('failed to remove like')
    }
}

export default removeLike