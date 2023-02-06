import {Routes, Route} from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav';
import { Reviews } from './components/Reviews';

function App() {
  return (
    <div>
      <header className="App">NC Games</header>
      <Nav/>
      <Routes>
        <Route path='/' element={<Reviews/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
