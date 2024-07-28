import React, { useReducer, useEffect } from 'react';
import Header from './header';
import Photos from './photos';
import { getUserByUsername } from '../../services/firebase';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0
};

export default function Profile({ username }) {
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );
    
    useEffect(() => {
        // think about caching here in localstorage so we don't make a network call we have already made previously (task)
        async function getProfileInfoAndPhotos() {
            const [{ ...user }] = await getUserByUsername(username);
            const photos = await getUserPhotosByUsername(username);

            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }
        getProfileInfoAndPhotos();
    }, [username]);
    
    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
                username = {username}
            />
            <Photos photos={photosCollection} />
        </>
    )
}