import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { searchUser } from "../../store/user"

const SearchBarComponent = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState("")

    const handleSearch = (event) => {
        event.preventDefault()
        dispatch(searchUser(user))
        
    }

    return (
        <div>
            <h1>Search Bar Component</h1>
            <form>
                <input value={user} onChange={(event) => setUser(event.target.value)} />
                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
        </div>
        

    )
}

export default SearchBarComponent