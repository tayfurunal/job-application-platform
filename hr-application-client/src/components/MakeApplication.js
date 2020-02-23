import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addApplication } from '../actions/applicationActions';

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
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTask = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      thoughtsOnJob: this.state.thoughtsOnJob
    };

    this.props
      .addApplication(this.state.projectIdentifier, newTask, this.props.history)
      .then(response => {
        if (!this.state.errors) {
          console.log('tayfur');
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
              <Link to={`/projectBoard/${id}`} className='btn btn-light'>
                Back to Project Board
              </Link>
              <h4 className='display-4 text-center'>Add Project Task</h4>
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
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Phone'
                    className='form-control form-control-lg'
                    name='phone'
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Address'
                    className='form-control form-control-lg'
                    name='address'
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    placeholder='Thoughts On Job'
                    name='thoughtsOnJob'
                    value={this.state.thoughtsOnJob}
                    onChange={this.onChange}
                  ></textarea>
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
