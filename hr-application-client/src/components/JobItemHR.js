import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteJob } from '../actions/jobActions';

class ProjectItem extends Component {
  onDeleteClick = id => {
    this.props.deleteJob(id);
  };

  render() {
    const { job } = this.props;
    return (
      <div className='container'>
        <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-2'>
              <span className='mx-auto'>{job.id}</span>
            </div>
            <div className='col-lg-6 col-md-4 col-8'>
              <h3>{job.jobTitle}</h3>
              <p>{job.jobDescription}</p>
            </div>
            <div className='col-md-4 d-none d-lg-block'>
              <ul className='list-group'>
                <Link to={`/application/${job.id}`}>
                  <li className='list-group-item board'>
                    <i className='fa fa-flag-checkered pr-1'> Details </i>
                  </li>
                </Link>

                <li
                  className='list-group-item delete'
                  onClick={() => this.onDeleteClick(job.id)}
                >
                  <i className='fa fa-minus-circle pr-1'> Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteJob: PropTypes.func.isRequired
};

export default connect(null, { deleteJob })(ProjectItem);
