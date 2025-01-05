import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobOpenings, getCompanyfunctions, getDepartments, getLocations } from '../api';
import './JobListPage.scss'; // Importing the Sass file

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companyfunctions, setCompanyFunctions] = useState([]);
  const [filters, setFilters] = useState({
    search: localStorage.getItem('search') || '',
    department: localStorage.getItem('department') || '',
    location: localStorage.getItem('location') || '',
    function: localStorage.getItem('function') || ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobOpenings(filters);
      setJobs(data);
      setFilteredJobs(data);
    };

    const fetchDepartments = async () => {
      const data = await getDepartments(filters);
      setDepartments(data);
    };

    const fetchLocations = async () => {
      const data = await getLocations(filters);
      setLocations(data);
    };

    const fetchCompanyfunctions = async () => {
      const data = await getCompanyfunctions(filters);
      setCompanyFunctions(data);
    };

    fetchJobs();
    fetchDepartments();
    fetchLocations();
    fetchCompanyfunctions();
  }, []);

  useEffect(() => {
    let filteredJobs = jobs;
    if (filters.search) {
      let input = filters.search.toLowerCase();
      filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(input)
      );
    }
    if (filters.department) {
      filteredJobs = filteredJobs.filter((j) => j.department.id.toString() === filters.department);
    }
    if (filters.location) {
      filteredJobs = filteredJobs.filter((j) => j.location.id.toString() === filters.location);
    }
    if (filters.function) {
      filteredJobs = filteredJobs.filter((j) => j.function.id.toString() === filters.function);
    }
    setFilteredJobs(filteredJobs);
  }, [filters]);

  // Update filters and persist in localStorage
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      localStorage.setItem(name, value); // Persist filter to localStorage
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      location: '',
      function: ''
    };
    setFilters(clearedFilters);
    localStorage.clear(); 
  };

  
  const removeFilter = (filterName) => {
    const updatedFilters = { ...filters, [filterName]: '' };
    setFilters(updatedFilters);
    localStorage.setItem(filterName, ''); 
  };

  return (
    <div className="job-list-container">
      <h1>Job Openings</h1>
      {error && <p>{error}</p>}

      <div className="filters">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search jobs..."
        />
        <select name="department" value={filters.department} onChange={handleFilterChange}>
          <option value="">Department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.title}
            </option>
          ))}
        </select>
        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.title}
            </option>
          ))}
        </select>
        <select name="function" value={filters.function} onChange={handleFilterChange}>
          <option value="">Function</option>
          {companyfunctions.map((jobFunction) => (
            <option key={jobFunction.id} value={jobFunction.id}>
              {jobFunction.title}
            </option>
          ))}
        </select>
        <button className="clear-all-btn" onClick={clearFilters}>Clear All</button>
      </div>

      <div className="applied-filters">
        <div>
          {filters.search && (
            <span className="filter-tag">
              Search: {filters.search}
              <button onClick={() => removeFilter('search')} className="remove-filter-btn">X</button>
            </span>
          )}
          {filters.department && (
            <span className="filter-tag">
              Department: {departments.find(dep => dep.id === Number(filters.department))?.title}
              <button onClick={() => removeFilter('department')} className="remove-filter-btn">X</button>
            </span>
          )}
          {filters.location && (
            <span className="filter-tag">
              Location: {locations.find(loc => loc.id === Number(filters.location))?.title}
              <button onClick={() => removeFilter('location')} className="remove-filter-btn">X</button>
            </span>
          )}
          {filters.function && (
            <span className="filter-tag">
              Function: {companyfunctions.find(func => func.id === Number(filters.function))?.title}
              <button onClick={() => removeFilter('function')} className="remove-filter-btn">X</button>
            </span>
          )}
        </div>
      </div>

      <div>
        {filteredJobs.length === 0 ? (
          <p>No job openings available</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.department.title}</p>
              <p>{job.location.title}</p>
              <div className="job-actions">
                
                <Link to={`/jobs/${job.id}`} className="view-btn">
                  View Details
                </Link>

              
                <button
                  className="apply-btn"
                  onClick={() => window.open(job.applyUrl, '_blank')}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobListPage;
