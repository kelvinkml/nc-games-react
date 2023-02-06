import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { instance } from "../utils/axios"


export const Review = () => {
    const [singleReview, setSingleReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()
    useEffect(()=>{
        instance.get(`/reviews/${id}`).then((result)=>{
            setSingleReview(result.data.review[0])
            setIsLoading(false)
        })
    }, [id])
    if(isLoading){
        return (
            <h4>Loading...</h4>
        )
    }

    return (
        <section className="single-review">
            <h2>{singleReview.title}</h2>
            <img alt={singleReview.title} src={singleReview.review_img_url}/>
            <br></br>
            <p className="author-category">By {singleReview.owner}</p>
            <p>{singleReview.category}</p>
            <br></br>
            <p>votes will go here</p>
            <br></br>
            <p>{singleReview.review_body}</p>
            <br></br>
            <div>
                <p>comments will go here</p>
                <p>WOW! amazing review!!!</p>
            </div>
        </section>
        
    )
}