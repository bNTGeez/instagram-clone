import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function seedDatabase(firestore) {
  const userId = import.meta.env.VITE_userId;

  const users = [
    {
      userId: "zero",
      username: "karl",
      fullName: "Karl Hadwen",
      emailAddress: "karlhadwen@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: serverTimestamp(),
    },
    {
      userId: "one",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: [userId],
      dateCreated: serverTimestamp(),
    },
    {
      userId: "two",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: [userId],
      dateCreated: serverTimestamp(),
    },
    {
      userId: "our",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: [userId],
      dateCreated: serverTimestamp(),
    },
  ];

  const addUsers = async()=>{
  for (const user of users) {
    try {
      await addDoc(collection(firestore, "users"), user);
      console.log('added')
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }
}

addUsers()


  for (let i = 1; i <= 5; ++i) {
    await addDoc(collection(firestore, "photos"), {
      photoId: i,
      userId: "2",
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "dali",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "orwell",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: serverTimestamp(),
    });
  }
}




