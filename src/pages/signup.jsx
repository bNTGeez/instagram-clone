import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import logo from "../assets/logo.png";
import { firestore } from "../lib/firebase";
import { doesUsernameExist } from "../services/firebase";

export default function Signup() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid =
    username === "" ||
    fullname === "" ||
    emailAddress === "" ||
    password === "";

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      console.log(!usernameExists);
      // runs when username doesnt exist
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );
        const newUser = userCredential.user;

        await updateProfile(newUser, {
          displayName: username,
        });
        console.log("Profile updated with username:", username);

        await addDoc(collection(firestore, "users"), {
          userId: newUser.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: serverTimestamp(),
        });
        console.log("User document added to Firestore");

        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setFullname("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setFullname("");
      setEmailAddress("");
      setPassword("");
      setError("Username taken, please try another");
    }
  };

  return (
    <div className="container flex mx-auto max-w-xs items-center h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>
          {error && (
            <p className="mb-4 text-xs text-red-500 text-center">{error}</p>
          )}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              className="text-sm text-gray w-full mr-4 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              text="text"
              placeholder="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your full name"
              className="text-sm text-gray w-full mr-4 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              text="text"
              placeholder="Full name"
              value={fullname}
              onChange={({ target }) => setFullname(target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your email address"
              className="text-sm text-gray w-full mr-4 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              text="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) =>
                setEmailAddress(target.value.toLowerCase())
              }
            />
            <input
              aria-label="Enter your password"
              className="text-sm text-gray w-full mr-4 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              text="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4">
          <p className="text-sm">
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
