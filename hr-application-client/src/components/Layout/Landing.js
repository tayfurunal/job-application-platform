import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import JobItem from '../JobItem';

class Landing extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    const jobs = this.props.job.jobs;

    return (
      <div className='projects'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Available Jobs</h1>
              <hr />
              {jobs.map(job => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job,
  security: state.security
});

export default connect(mapStateToProps, { getJobs })(Landing);
