import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';
import { async } from 'q';




export const fetchPosts = () => async dispatch => {

    const resp = await jsonPlaceholder.get('/posts');


    dispatch({
        type: 'FETCH_POSTS',
        payload: resp.data
    });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}

//going to call endpoint every time 
export const fetchUser = (id) => async dispatch => {

    const resp = await jsonPlaceholder.get(`/users/${id}`);


    dispatch({
        type: 'FETCH_USER',
        payload: resp.data
    });
};
// with same id going to call one time only

// export const fetchUser = (id) => dispatch => {

//     _fetchUser(id, dispatch);

    
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const resp = await jsonPlaceholder.get(`/users/${id}`);


//     dispatch({
//         type: 'FETCH_USER',
//         payload: resp.data
//     });
// })