import {Routes, Route} from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav';
import { Review } from './components/Review';
import { Reviews } from './components/Reviews';
import { Categories } from './components/Categories';
import { useState, useEffect } from "react"
import { instance } from './utils/axios';


function App() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    instance.get('/reviews').then((result)=>{
        setReviews(result.data.reviews)
        setIsLoading(false)
    }).catch((err)=>{
    })
}, [])
  return (
    <div>
      <header className="App">NC Games</header>
      <Nav/>
      <Routes>
        <Route path='/reviews' element={<Reviews isLoading={isLoading} reviews={reviews} setReviews={setReviews} setIsLoading={setIsLoading}/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/' element={<Reviews isLoading={isLoading} reviews={reviews} setReviews={setReviews}/>}></Route>
        <Route path='/reviews/:id' element={<Review />}></Route>
      </Routes>
    </div>
  );
}

export default App;
