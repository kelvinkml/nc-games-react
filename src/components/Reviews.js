import { Link } from "react-router-dom"
import { useEffect } from "react"
import { instance } from "../utils/axios"


export const Reviews = ({setReviews, reviews, setIsLoading, isLoading}) => {
    const queryParams = new URLSearchParams(window.location.search)
    const category = queryParams.get("category")
    
    useEffect(()=>{
        setIsLoading(true)
        instance.get('/reviews', {params: {category}}).then((result)=>{
            setReviews(result.data.reviews)
            setIsLoading(false)
        }).catch((err)=>{
        })
    }, [category])


    if(isLoading){
        return (
            <h2>Loading...</h2>
        )
    }
    else return (
        <section className="reviews">
            <h2>Reviews</h2>
            {reviews.map((review)=>{
                return (
                <section key={review.review_id} className="review-card">
                    <Link className="review-title" to={`/reviews/${review.review_id}`}>
                        <h4 id="review-title">{review.title}</h4>
                        <p>Date</p>
                    </Link>
                    <div className="review-card-info">
                        <div className="author-category">
                        <p style={{color: 'red'}}>{review.owner}</p>
                        <p>{review.category}</p>
                        </div>
                        <img alt={review.title} className='review-card-img' src={review.review_img_url}/>
                    </div>
                </section>
                    )

            
            })
            }

        </section>
    )
}