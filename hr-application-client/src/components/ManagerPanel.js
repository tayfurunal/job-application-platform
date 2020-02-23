import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobs } from '../actions/jobActions';
import ProjectItemHR from './Project/ProjectItemHR';
import CreateProjectButton from './Project/CreateProjectButton';

class ManagerPanel extends Component {
  componentDidMount() {
    if (
      !this.props.security.validToken ||
      !this.props.security.roles[0].includes('ROLE_HR')
    ) {
      this.props.history.push('/');
    } else {
      this.props.getJobs();
    }
  }

  render() {
    const jobs = this.props.job.jobs;

    return (
      <div className='projects'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Jobs</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {jobs.map(job => (
                <ProjectItemHR key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ManagerPanel.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job,
  security: state.security
});

export default connect(mapStateToProps, { getJobs })(ManagerPanel);
