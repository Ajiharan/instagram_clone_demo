import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db, auth } from "../Firebase";
import firebase from "firebase";
const Post = ({ ImageUrl, userName, caption, postId, Signuser }) => {
  const [comments, setComments] = useState([]);
  const [comment, setCommnent] = useState("");

  useEffect(() => {
    const unSubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      unSubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        userName: Signuser?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setCommnent("");
      })
      .catch((err) => {
        setCommnent("");
        console.log(err);
      });
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt="Remy Sharp"
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h3>UserName</h3>
      </div>

      <img src={ImageUrl} alt="image" className="post__Image" />
      <h4 className="post__text">
        <strong>{userName}</strong> {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment, i) => (
          <p key={i}>
            <strong>{comment.userName} : </strong>
            {comment.text}
          </p>
        ))}
      </div>
      {Signuser && (
        <form className="post__commentBox">
          <input
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setCommnent(e.target.value)}
          />
          <button
            type="submit"
            onClick={postComment}
            disabled={!comment}
            className="post__button"
          >
            post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
