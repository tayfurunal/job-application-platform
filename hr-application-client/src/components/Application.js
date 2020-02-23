import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Backlog from './Backlog';
import { getBacklog } from '../../actions/backlogActions';
import { getJob } from '../../src/actions/jobActions';

class Application extends Component {
  constructor() {
    super();

    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
    this.props.getJob(id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.state;
    const job = this.props.project.project;
    return (
      <div className='container'>
        <br />
        <h2 className='text-center'>{job.jobTitle}</h2>
        <hr />
        <h3>Job Description:</h3>{' '}
        <h5>
          <p>{job.jobDescription}</p>
        </h5>
        <h3>Last Application Date:</h3> <h5>{job.lastApplication}</h5>
        <p></p>
        <div className='text-center'>
          <Link to={`/makeApplication/${id}`} className='btn btn-primary mb-3'>
            <i className='fas fa-plus-circle'> Make Application</i>
          </Link>
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors,
  project: state.project
});

export default connect(mapStateToProps, { getBacklog, getJob })(Application);
