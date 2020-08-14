import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

const Post = ({ ImageUrl, userName, caption }) => {
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
    </div>
  );
};

export default Post;
