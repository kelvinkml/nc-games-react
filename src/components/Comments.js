import { useState, useEffect, useContext } from "react"
import { instance } from "../utils/axios"
import { UserContext } from "../contexts/UserContext"

export const Comments = ({id}) => {
    const { user } = useContext(UserContext)

    const [comment, setComment] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])

    const [error, setError] = useState(false)

    useEffect(()=>{
        instance.get(`/reviews/${id}/comments`).then((result)=>{
            setIsLoading(false)
            setComments(result.data.comments)
        })
    }, [id, refresh, isLoading])

    const newComment = (event) => {
        setIsLoading(false)
        event.preventDefault()
        const commentToPost = {
            body: comment,
            username: user
        }
        instance.post(`/reviews/${id}/comments`, commentToPost).then((result)=>{
        setRefresh(true)
        setIsLoading(true)
        })
        .catch((err)=>{
            setError(true)
        })
    }

    
    
    const deleteComment = ({comment}) => {
        instance.delete(`/comments/${comment.comment_id}`)
        .then(()=>{
            setIsLoading(true)})
        .catch((err)=>{})
        
    }

    if(isLoading){
        return <p>Comments Loading...</p>
    }
    else
    return (
        <section>
            <h4>Comments:</h4>
            <form>
                <label htmlFor="comment">New Comment</label><br></br>
                <input 
                type='text'
                id='comment'
                onChange={(event)=>
                setComment(event.target.value)}
                >                
                </input>
                <button onClick={newComment}>Submit</button>
            </form><br></br>
            <p hidden={!error}>You must be signed in to comment</p>
            {comments.map((comment)=>{
                return (
                <section  key={comment.comment_id}>
                    <p>{comment.author} says: </p>
                    <p>{comment.body}</p>
                    <button hidden={comment.author !== user} onClick={() => deleteComment({comment})}>Delete</button>
                </section>
                )
            })}
        </section>    
    )
}
