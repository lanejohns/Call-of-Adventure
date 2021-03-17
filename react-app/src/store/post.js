const CREATE_POST = "post/createNewPost"

const createNewPost = (post) => {
    return {
        type: CREATE_POST,
        payload: post
    }
}

export const postThunk = ({party_id, body}) => async (dispatch) => {
    const response = await fetch(`/api/posts/${party_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({party_id, body})
    })
    console.log("POST THUNK RESPONSE", response)
    const post = await response.json()
    dispatch(createNewPost(post))
    return post
}


const initialState = {}

const postReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_POST:
            const newPost = action.payload.post
            const all_posts = state.all_posts
            newState = { all_posts: { ...all_posts, ...newPost}}
            return newState
        default:
            return state
    }
}

export default postReducer