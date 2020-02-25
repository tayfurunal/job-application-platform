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
    let applications = await axios.get(
      `/api/application/${this.props.security.user.sub}`
    );
    this.setState({
      applications: applications.data
    });
  };

  componentDidMount() {
    this.getApplications();
  }

  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>My Applications</h1>
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
              </tr>
            </thead>
            <tbody>
              {this.state.applications.map((listValue, index) => {
                return (
                  <tr key={index}>
                    <td>{listValue.id}</td>
                    <td>{listValue.job.jobTitle}</td>
                    <td>{listValue.name}</td>
                    <td>{listValue.email}</td>
                    <td>
                      <a
                        href={`http://localhost:8080/downloadFile/${listValue.resumeUrl}`}
                      >
                        {listValue.resumeUrl}
                      </a>
                    </td>
                  </tr>
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
