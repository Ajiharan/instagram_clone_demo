import React, { useState } from "react";
import "./App.css";
import Post from "./post/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      ImageUrl:
        "https://scontent.fcmb4-1.fna.fbcdn.net/v/t31.0-8/s960x960/22137049_1800196716937367_3822949587228347143_o.jpg?_nc_cat=109&_nc_sid=05277f&_nc_ohc=npe8kzYNAvoAX9adfFn&_nc_ht=scontent.fcmb4-1.fna&_nc_tp=7&oh=f3ec7d3480bc11241224ea6ee8f7e1cc&oe=5F5A7AA8",
      userName: "cat95",
      caption: "cats are always pretty 🍀🍀",
    },
    {
      ImageUrl:
        "https://scontent.fcmb4-1.fna.fbcdn.net/v/t1.0-9/20770322_1784022531888119_1135927188321928001_n.jpg?_nc_cat=102&_nc_sid=05277f&_nc_ohc=WvVzJX88r-sAX-leUjW&_nc_ht=scontent.fcmb4-1.fna&oh=07593b5ab3b14a89a8b0efc3f719a17e&oe=5F5B44DE",
      userName: "haran95",
      caption: "Musical instruments are  always touch my heart🍀",
    },
    {
      ImageUrl:
        "https://scontent.fcmb4-1.fna.fbcdn.net/v/t1.0-9/47326142_2034983486792021_3772129562574454784_n.jpg?_nc_cat=108&_nc_sid=05277f&_nc_ohc=RCsRDqY2mmwAX-NX23a&_nc_ht=scontent.fcmb4-1.fna&oh=7f3917b4c277977fe3f4e36ac0c13062&oe=5F5B57D6",
      userName: "nature#004",
      caption: "Society will try to protect our nature🌴🌴",
    },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          src={
            "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          }
          alt="headerImage"
          className="app__headerImage"
        />
      </div>
      {posts.map((data) => (
        <Post
          key={data.ImageUrl}
          ImageUrl={data.ImageUrl}
          caption={data.caption}
          userName={data.userName}
        />
      ))}
    </div>
  );
}

export default App;
