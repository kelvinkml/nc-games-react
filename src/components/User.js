import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const SignIn = () => {
    const { user, setUser } = useContext(UserContext)

    const signIn = () => {
        setUser('jessjelly')
    }

    return (
        <p  className='username'>{user}</p>
    )
}