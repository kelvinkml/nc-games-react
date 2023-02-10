import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"



export const Nav = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setIsSignedIn(true)
        }
    }, [user])

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
        <Link to={'/sign-in'}>
        <button hidden={isSignedIn} className="nav-button">Sign In</button>
        </Link>
        <p>{user}</p>
        </section>
        </section>
    )
}

