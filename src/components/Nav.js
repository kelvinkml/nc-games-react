import { Link } from "react-router-dom"
import { SignIn } from "./User"


export const Nav = () => {
    return (
        <section>
        <div className="nav-bar">
        <header>NC Games</header>
        </div>
        <section className="nav-bar">
        <Link to={'/'}>
        <button className="nav-button">Home</button>
        </Link>
        <Link to={'/categories'}>
        <button className="nav-button">Categories</button>
        </Link>
        <Link to={'/'}>
        <button className="nav-button">Sign In</button>
        </Link>
        <SignIn/>
        </section>
        </section>
    )
}

