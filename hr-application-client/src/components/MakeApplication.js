import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addApplication } from '../actions/applicationActions';
import axios from 'axios';

class MakeApplication extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      thoughtsOnJob: '',
      resumeUrl: '',
      projectIdentifier: id,
      file: null,
      submit: false,
      success: false,
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.security.validToken) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {}
    });
  };

  handleFile = e => {
    let file = e.target.files[0];
    this.setState({ file: file, resumeUrl: file.name, submit: true });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTask = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      thoughtsOnJob: this.state.thoughtsOnJob,
      resumeUrl: this.state.resumeUrl
    };

    let formData = new FormData();
    formData.append('file', this.state.file);

    axios
      .post(`/uploadFile`, formData)
      .then(res => {
        console.log('success');
      })
      .catch(err => console.log('failure'));

    this.props
      .addApplication(this.state.projectIdentifier, newTask, this.props.history)
      .then(response => {
        if (Object.keys(this.state.errors).length === 0) {
          this.setState({ success: true });
        }
      });
  };

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;
    console.log();
    return (
      <div className='add-PBI'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link
                to={`/application/${id}`}
                className='btn btn-primary'
                style={{ marginBottom: 10 }}
              >
                Back to Details
              </Link>
              <h4 className='display-4 text-center'>Make Application</h4>
              {this.state.success ? (
                <div class='alert alert-success' role='alert'>
                  Your application is successful
                </div>
              ) : (
                ''
              )}
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={
                      errors.name
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    name='name'
                    placeholder='Name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    className={
                      errors.email
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Phone'
                    className={
                      errors.phone
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    name='phone'
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  {errors.phone && (
                    <div className='invalid-feedback'>{errors.phone}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Address'
                    className={
                      errors.address
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    name='address'
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {errors.address && (
                    <div className='invalid-feedback'>{errors.address}</div>
                  )}
                </div>
                <div className='form-group'>
                  <textarea
                    className={
                      errors.thoughtsOnJob
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    placeholder='Thoughts On Job'
                    name='thoughtsOnJob'
                    value={this.state.thoughtsOnJob}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.thoughtsOnJob && (
                    <div className='invalid-feedback'>
                      {errors.thoughtsOnJob}
                    </div>
                  )}
                </div>
                <input
                  type='file'
                  placeholder='file'
                  className='form-control form-control-lg'
                  name='file'
                  onChange={this.handleFile}
                />
                <input
                  type='submit'
                  disabled={!this.state.submit}
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

MakeApplication.propTypes = {
  addApplication: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(mapStateToProps, { addApplication })(MakeApplication);
