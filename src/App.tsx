import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import Resist from './Resist';

function App() {
  return (
    <BrowserRouter>
        <header>
            <h1>Title</h1>
        </header>

        <Routes>
            <Route index element={<Top />} />
            <Route path="/resist" element={<Resist />} />
        </Routes>

        <footer>
            <p>Footer</p>
        </footer>
    </BrowserRouter>
  );
}

export default App;
