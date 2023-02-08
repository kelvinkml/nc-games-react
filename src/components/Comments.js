import { useState, useEffect } from "react"
import { instance } from "../utils/axios"

export const Comments = ({id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    useEffect(()=>{
        instance.get(`/reviews/${id}/comments`).then((result)=>{
            setComments(result)
            setIsLoading(false)
        })
    }, [id])
    if(isLoading){
        return <p>Comments Loading...</p>
    }
    else
    return (
        <section>
            <h4>Comments:</h4>
            <p>Add Comment...</p>
            {comments.data.comments.map((comment)=>{
                return (
                <section key={comment.comment_id}>
                    <p>{comment.author} says: </p>
                    <p>{comment.body}</p>
                </section>
                )
            })}
        </section>    
    )
}