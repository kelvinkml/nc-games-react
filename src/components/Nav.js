import { Link } from "react-router-dom"
import { SignIn } from "./User"


export const Nav = () => {
    return (
        <section>
        <Link to={'/'}>
        <button>Home</button>
        </Link>
        <Link to={'/categories'}>
        <button>Categories</button>
        </Link>
        <button>Sign In</button>
        <SignIn/>

        </section>
    )
}

