import React from 'react';
import { Link } from 'react-router-dom';

const CreateJobButton = () => {
  return (
    <React.Fragment>
      <Link to='/addJob' className='btn btn-lg btn-info'>
        Create a Job
      </Link>
    </React.Fragment>
  );
};

export default CreateJobButton;
