import {Routes, Route} from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav';
import { Review } from './components/Review';
import { Reviews } from './components/Reviews';
import { Categories } from './components/Categories';
import { SignIn } from './components/User';
import { NotFound } from './components/NotFound';
import { useState } from 'react';


function App() {
  const [error] = useState('Bad URL!')

  return (
    <div>

      <Nav/>
      <Routes>
        <Route path='/reviews' element={<Reviews/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/' element={<Reviews/>}></Route>
        <Route path='/reviews/:id' element={<Review />}></Route>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='*' element={<NotFound error={error}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
