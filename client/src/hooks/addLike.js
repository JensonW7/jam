const addLike = async ( userToAddLike ) => {
    console.log('usertoddlike', userToAddLike)
    try {
        const response = await fetch('/api/current_songs/add_like/' + userToAddLike, {
        method: 'PATCH'
        })
    } catch (error) {
        throw new Error('failed to add like')
    }
}

export default addLike