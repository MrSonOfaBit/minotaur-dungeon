import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './menu/Home';
import Error404 from './error/Error404';
import Fight from './game/Fight';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
