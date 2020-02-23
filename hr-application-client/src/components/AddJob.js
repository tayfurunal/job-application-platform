import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createJob } from '../actions/jobActions';

class AddJob extends Component {
  constructor() {
    super();

    this.state = {
      jobTitle: '',
      jobDescription: '',
      lastApplication: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (
      !this.props.security.validToken ||
      !this.props.security.roles[0].includes('ROLE_HR')
    ) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newJob = {
      jobTitle: this.state.jobTitle,
      jobDescription: this.state.jobDescription,
      lastApplication: this.state.lastApplication
    };

    this.props.createJob(newJob, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='project'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>Create a Job</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={
                      errors.jobTitle
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    placeholder='Job Title'
                    name='jobTitle'
                    value={this.state.jobTitle}
                    onChange={this.onChange}
                  />
                  {errors.jobTitle && (
                    <div className='invalid-feedback'>{errors.jobTitle}</div>
                  )}
                </div>
                <div className='form-group'>
                  <textarea
                    className={
                      errors.jobDescription
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    placeholder='Job Description'
                    name='jobDescription'
                    value={this.state.jobDescription}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.jobDescription && (
                    <div className='invalid-feedback'>
                      {errors.jobDescription}
                    </div>
                  )}
                </div>
                <h6>Last Application Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='lastApplication'
                    value={this.state.lastApplication}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type='submit'
                  className='btn btn-primary btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

AddJob.propTypes = {
  createJob: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { createJob })(AddJob);
