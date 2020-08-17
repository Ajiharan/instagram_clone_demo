import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./post/Post";
import { db, auth } from "./Firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import ImageUpload from "./upload/ImageUpload";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState("");
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user, userName]);
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // console.log(authUser);
        return authUser.user.updateProfile({
          displayName: userName,
        });
        alert("Sucessfully created");
      })
      .catch((err) => {
        alert(err.message);
      });

    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      console.log(err);
    });
    setOpenSignIn(false);
  };
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                src={
                  "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                }
                alt="headerImage"
                className="app__headerImage"
              />
            </center>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="UserName"
            />
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <Button onClick={(e) => signUp(e)}>Sign up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__sigin">
            <center>
              <img
                src={
                  "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                }
                alt="headerImage"
                className="app__headerImage"
              />
            </center>

            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <Button onClick={(e) => signIn(e)}>Sign in</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src={
            "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          }
          alt="headerImage"
          className="app__headerImage"
        />
        {user ? (
          <Button type="submit" onClick={() => auth.signOut()}>
            LogOut
          </Button>
        ) : (
          <div>
            <Button type="submit" onClick={() => setOpen(true)}>
              sign Up
            </Button>
            <Button type="submit" onClick={() => setOpenSignIn(true)}>
              sign In
            </Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={post.ImageUrl}
            ImageUrl={post.ImageUrl}
            caption={post.caption}
            userName={post.userName}
          />
        ))}
      </div>

      {user?.displayName ? (
        <ImageUpload userName={user.displayName} />
      ) : (
        <h3>Please Sign In</h3>
      )}
    </div>
  );
}

export default App;
