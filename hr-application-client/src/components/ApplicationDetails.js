import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ApplicationDetails extends Component {
  constructor() {
    super();

    this.state = {
      errors: {},
      application: {},
      jobName: ''
    };
  }

  getApplication = async id => {
    let application = await axios.get(`/api/application/details/${id}`);
    this.setState({
      application: application.data,
      jobName: application.data.job.jobTitle
    });
  };

  componentDidMount() {
    if (
      !this.props.security.validToken ||
      !this.props.security.roles[0].includes('ROLE_HR')
    ) {
      this.props.history.push('/');
    } else {
      const { id } = this.props.match.params;
      this.getApplication(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div className='container'>
        <br />
        <h2 className='text-center'>{this.state.jobName}</h2>
        <hr />
        <h3>Name:</h3>
        <h5>{this.state.application.name}</h5>
        <h3>Email:</h3> <h5>{this.state.application.email}</h5>
        <h3>Phone:</h3>
        <h5>{this.state.application.phone}</h5>
        <h3>Address:</h3>
        <h5>{this.state.application.address}</h5>
        <h3>Thoughts On Job:</h3>
        <h5>{this.state.application.thoughtsOnJob}</h5>
        <h3>Resume:</h3>
        <h5>
          <a
            href={`http://localhost:8080/downloadFile/${this.state.application.resumeUrl}`}
          >
            {this.state.application.resumeUrl}
          </a>
        </h5>
      </div>
    );
  }
}

ApplicationDetails.propTypes = {
  errors: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(mapStateToProps, {})(ApplicationDetails);
