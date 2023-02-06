import { useState, useEffect } from "react"
import { instance } from "../utils/axios"

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    useEffect(()=>{
        instance.get('/reviews').then((result)=>{
            setReviews(result.data.reviews)
        })
    }, [])


    return (
        <section className="reviews">
            <h2>Reviews</h2>
            {reviews.map((review)=>{
                return (
                <section className="review-card">
                    <div className="review-title">
                        <h4 id="review-title">{review.title}</h4>
                        <p>Date</p>
                    </div>
                    <div className="review-card-info">
                        <p style={{color: 'red'}}>{review.owner}</p>
                        <p>{review.category}</p>
                        <img className='review-card-img' src={review.review_img_url}/>
                    </div>
                </section>
                    )

            
            })
            }

        </section>
    )
}