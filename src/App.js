import {Routes, Route} from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav';
import { Review } from './components/Review';
import { Reviews } from './components/Reviews';
import { Categories } from './components/Categories';


function App() {

  return (
    <div>

      <Nav/>
      <Routes>
        <Route path='/reviews' element={<Reviews/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/' element={<Reviews/>}></Route>
        <Route path='/reviews/:id' element={<Review />}></Route>
      </Routes>
    </div>
  );
}

export default App;
