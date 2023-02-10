import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { instance } from "../utils/axios";
import { createRef } from "../utils/createRef";

export const SignIn = () => {
    const { setUser } = useContext(UserContext)
    const [queryUName, setQueryUName] = useState('')
    const [usernames, setUsernames] = useState([])
    const [canSignIn, setCanSignIn] = useState(false)

    instance.get('/users').then((res)=>{
        setUsernames(createRef(res.data.users))       
    })

    const signIn = (event) => {
        event.preventDefault()
        setCanSignIn(usernames.includes(queryUName))
    }
    useEffect(()=>{
        if(canSignIn){
            setUser(queryUName)
        }
    }, [canSignIn, queryUName, setUser])
    return (
        <section className="sign-in">
            <form hidden={canSignIn}>
                <label htmlFor="username">Please enter your username: </label>
                <input
                onChange={(event) => {setQueryUName(event.target.value)}} 
                id='username' 
                type='text'>                   
                </input><br></br>
                <button onClick={signIn}>Sign In</button>
            </form>
        </section>
    )
}