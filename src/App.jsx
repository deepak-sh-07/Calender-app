import Calendar from './pages/Calender';

// If using React Router:
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;