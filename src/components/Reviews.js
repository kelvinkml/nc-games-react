import { Link, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { instance } from "../utils/axios"
import { NotFound } from "./NotFound"



export const Reviews = () => {
    
    const [error, setError] = useState() 
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState()
    const [asc, setAsc] = useState()

    const [serachParams] = useSearchParams()
    let category = serachParams.get('category')
    
    
    useEffect(()=>{
        setError()
        setIsLoading(true)
        instance.get('/reviews', {params: {category: category, sort_by: sortBy, order_by: asc}}).then((result)=>{
            setReviews(result.data.reviews)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setError(err.response.data.msg)
            setIsLoading(false)
        })
    }, [sortBy, asc, category])

    if(error){
        return <NotFound error={error}/>
    }

    const settingSort = (event) => {
        event.preventDefault()
        setSortBy(event.target.value)
    }
    const settingOrder = (event) =>{
        event.preventDefault()
        setAsc(event.target.value)
    }
    if(isLoading){
        return (
            <h2>Loading...</h2>
        )
    }
        return (
        <section className="reviews">
            <h2>Reviews</h2>
            <div id="sort-by">
            <label htmlFor="sort">Sort by:</label>
                <select onChange={settingSort} name="sortby" id="sort">
                    <option value="created_at">Date</option>
                    <option value="votes">Votes</option>
                    <option value="title">Title</option>
                    <option value='comment_count'>Comments</option>
                </select>
                <select onChange={settingOrder} name='orderby' id='order'>
                    <option value='ASC'>Ascending</option>
                    <option value='DESC'>Descending</option>
                </select>
            </div>
            {reviews.map((review)=>{
                return (
                <section key={review.review_id} className="review-card">
                    <Link className="review-title" to={`/reviews/${review.review_id}`}>
                        <h4 id="review-title">{review.title}</h4>
                        <p>{review.created_at}</p>
                    </Link>
                    <div className="review-card-info">
                        <div className="author-category">
                        <p>Votes: {review.votes}</p>
                        <p style={{color: 'red'}}>{review.owner}</p>
                        <p>{review.category}</p>
                        <p>Comments: {review.comment_count}</p>
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