import { useState, useEffect, useContext } from "react"
import { instance } from "../utils/axios"
import { UserContext } from "../contexts/UserContext"

export const Comments = ({id}) => {
    const { user } = useContext(UserContext)

    const [comment, setComment] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [commentId, setCommentId] = useState()
    const [removeComment, setRemoveComment] = useState(false)

    useEffect(()=>{
        instance.get(`/reviews/${id}/comments`).then((result)=>{
            setIsLoading(false)
            setComments(result.data.comments)
        })
    }, [id, refresh])

    const newComment = (event) => {
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
        })
    }

    if(removeComment){
        instance.delete(`/comments/${commentId}`).then(()=>{
        }).catch((err)=>{
        })
    }


    const deleteComment = ({comment}) => {
        setCommentId(comment.comment_id)
        setRemoveComment(true)
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
            {comments.map((comment)=>{
                return (
                <section hidden={removeComment && comment.comment_id === commentId} key={comment.comment_id}>
                    <p>{comment.author} says: </p>
                    <p>{comment.body}</p>
                    <button onClick={() => deleteComment({comment})}>Delete</button>
                </section>
                )
            })}
        </section>    
    )
}