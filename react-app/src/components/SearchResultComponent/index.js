import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const SearchResultComponent = ({user}) => {

    const searchedUsers = useSelector((state) => state.users.searched_users)
    
    return (
        <div>
            <h1>Search Results</h1>
            {searchedUsers && Object.values(searchedUsers).map((user) => (
                <div>
                    <h5 key={user.id}>{user.username}</h5>
                    <button>Add to party</button>
                </div>
            ))}
        </div>
    )
}

export default SearchResultComponent