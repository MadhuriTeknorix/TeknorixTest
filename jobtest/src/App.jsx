import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import JobListPage from './components/JobListPage';
import JobDetailsPage from './components/JobDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Routes>
   
    </Router>
  );
}

export default App;
