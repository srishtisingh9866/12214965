import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}
