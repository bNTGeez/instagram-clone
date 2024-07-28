

export async function getSuggestedProfiles(userId) {
    const result = await firebase.firestore().collection('users').limit(10).get();
    const [{ following }] = await getUserByUserId(userId);
        
    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateUserFollowing(docId, profileId, isFollowingProfile) {
    return firebase
        .firestore()
        .collection('users')
        .doc(docId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(docId, followingUserId, isFollowingProfile) {
    return firebase
        .firestore()
        .collection('users')
        .doc(docId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(followingUserId)
                : FieldValue.arrayUnion(followingUserId)
        });
}