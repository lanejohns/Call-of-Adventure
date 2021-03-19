const CREATE_POST = "post/createNewPost"
const GET_POSTS = "post/getAllPosts"

const createNewPost = (post) => {
    return {
        type: CREATE_POST,
        payload: post
    }
}

const getAllPosts = (posts) => {
    return {
        type: GET_POSTS,
        payload: posts
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

export const getPosts = (party_id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${party_id}`)
    const posts = await response.json()
    dispatch(getAllPosts(posts))
    return posts
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
        case GET_POSTS:
            newState = Object.assign({}, state, { ...action.payload })
            return newState
        default:
            return state
    }
}

export default postReducer