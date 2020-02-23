import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectItem extends Component {
  render() {
    const { job } = this.props;
    return (
      <div className='container'>
        <div class='card' style={{ marginBottom: 20 }}>
          <h2 class='card-header'>{job.jobTitle}</h2>
          <div class='card-body'>
            <h4 class='card-title'>{job.jobDescriptionSummary}</h4>
            <h6 class='card-text'>
              Number of Application: {job.numberOfApplication}
            </h6>
            <Link to={`/application/${job.id}`} class='btn'>
              <ul className='list-group'>
                <Link to={`/application/${job.id}`}>
                  <li className='list-group-item board'>
                    <i className='fa fa-flag-checkered pr-1'> Details </i>
                  </li>
                </Link>
              </ul>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(ProjectItem);
