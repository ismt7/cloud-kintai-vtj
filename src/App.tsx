import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import Attendance from './Attendance';

function App() {
  return (
    <BrowserRouter>
        <header>
            <h1>Title</h1>
        </header>

        <Routes>
            <Route index element={<Top />} />
            <Route path="/attendance" element={<Attendance />} />
        </Routes>

        <footer>
            <p>Footer</p>
        </footer>
    </BrowserRouter>
  );
}

export default App;
