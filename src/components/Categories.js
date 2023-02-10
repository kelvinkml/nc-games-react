import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { instance } from "../utils/axios"


export const Categories = () => {
    const [categories, setCategories] = useState([])


    useEffect(()=>{
        instance.get('/categories').then((result)=>{
            const formattedCatag = result.data.map((category)=>{
                let formatted = category.slug.replaceAll('-', ' ')
                formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1)
                return {'slug': category.slug, 'title': formatted}
            })
            setCategories(formattedCatag)
        })
        

    }, [])

    return (
        <section>
            <h2>Categories:</h2>
            
            {categories.map((category)=>{
                return(
                    <section key={category.slug}>
                        <Link to={`/reviews?category=${category.slug}`}>
                            <h3>{category.title}</h3>
                        </Link>
                    </section>
                )
            })}
        </section>
    )
}