import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MyApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: []
    };
  }

  getApplications = async () => {
    let applications = await axios.get(`/api/application/all`);
    this.setState({
      applications: applications.data
    });
  };

  componentDidMount() {
    if (
      !this.props.security.validToken ||
      !this.props.security.roles[0].includes('ROLE_HR')
    ) {
      this.props.history.push('/');
    } else {
      this.props.getJobs();
    }

    this.getApplications();
  }

  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Applications</h1>
        {this.state.applications.length === 0 ? (
          <div
            class='alert alert-danger text-center'
            role='alert'
            style={{ marginTop: 30 }}
          >
            <h3>NO APPLICATIONS</h3>
          </div>
        ) : (
          <table class='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Job Name</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Resume</th>
                <th scope='col'>Details</th>
              </tr>
            </thead>
            <tbody>
              {this.state.applications.map((listValue, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{listValue.id}</td>
                      <td>{listValue.job.jobTitle}</td>
                      <td>{listValue.name}</td>
                      <td>{listValue.email}</td>
                      <td>{listValue.resumeUrl}</td>
                      <button className='btn btn-primary'>Go</button>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

MyApplication.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, {})(MyApplication);
