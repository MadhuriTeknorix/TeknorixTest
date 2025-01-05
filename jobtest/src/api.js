import axios from 'axios';

const BASE_URL = 'https://teknorix.jobsoid.com/api/v1';

export const getJobOpenings = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching job openings:', error);
  }
};

export const getDepartments = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}/departments`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching job openings:', error);
  }
};

export const getLocations = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}/locations`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching job openings:', error);
  }
};

export const getCompanyfunctions = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}/functions`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching job openings:', error);
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
  }
};
