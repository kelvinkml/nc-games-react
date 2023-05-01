import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";

export const Nav = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setIsSignedIn(true);
    }
  }, [user]);

  return (
    <section className="nav-bar">
      <div>
        <Link to={"/"}>
          <header className="header-title">Board?</header>
        </Link>
      </div>
      <section className="nav-buttons">
        <Link to={"/categories"}>
          <text className="nav-button">Categories</text>
        </Link>
        <Link to={"/sign-in"}>
          <text hidden={isSignedIn} className="nav-button">
            Sign In
          </text>
        </Link>
        <text className="user">{user}</text>
      </section>
    </section>
  );
};
