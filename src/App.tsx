
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-100">
        <main className="">
          <Routes>
            <Route path="/" element={<MapPage />} />
            {/* <Route path="/map-page2" element={<MapPage2 />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
