import React, { useEffect, useState } from 'react';
import { useParams, Link,useNavigate  } from 'react-router-dom';
import { getJobDetails } from '../api';
import './JobDetailsPage.scss';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 



  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const data = await getJobDetails(id);
        setJob(data);
      } catch (error) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!job) return <div>Job not found</div>

  return (
    <div className="job-details-container">
      <button onClick={() => navigate('/')} className="back-btn">Back to Job List</button>
      <h1 className="job-title">{job.title}</h1>
      <div
        className="job-description"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
      <div className="job-meta">
        <p>{job.department.title}</p>
        <p>{job.location.title}</p>
      </div>
      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="apply-btn">
        Apply Now
      </a>

      <div className="other-jobs">
        <h2>Other Job Openings from {job.department.title}</h2>
        {otherJobs.map((otherJob) => (
          <div key={otherJob.id} className="other-job-card">
            <h3>{otherJob.title}</h3>
            <Link to={`/jobs/${otherJob.id}`}>View Details</Link>
          </div>
        ))}
      </div>

      <div className="social-share">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default JobDetailsPage;
