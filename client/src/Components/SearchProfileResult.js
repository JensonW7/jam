import { useEffect, useState } from 'react'

const SearchProfile = ({searchResult}) => {

    function renderProfiles({searchResult}) {

        console.log(searchResult)

        let profileList = []

        if(searchResult) {
            profileList = searchResult.map((profile) => {
                return (
                    <div className="profile">
                        <p><span>Name: </span>{profile.name}</p>
                    </div>
                );
            });
        }
        
        return <div className="profiles">{profileList}</div>;
    }

    return (
         <>
            {renderProfiles({searchResult})}
         </>
    )
}

export default SearchProfile
