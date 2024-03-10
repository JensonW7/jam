const SongCollectionFinder = ({ collection }) => {
    


    return (
        <div className="collection">
            <h4>{collection.user}</h4>
            <div className="songs">
                {collection.songs.map((song) => (
                    <div className="song-info">
                        <p><span>Song: </span>{song.title}</p>
                        <p><span>Artist: </span>{song.artist}</p>
                        <p><span>Album: </span>{song.album}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SongCollectionFinder