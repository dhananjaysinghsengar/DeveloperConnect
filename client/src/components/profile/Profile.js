import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  match,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link className='btn btn-light' to='/profiles'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link className='btn btn-dark' to='/edit-profile'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>

          <div className='profile-exp bg-white p-2'>
            <h2 className='text-primary'>Experience</h2>
            {profile.experience === null ? (
              <h4>No experience credentials</h4>
            ) : (
              <Fragment>
                {<ProfileExperience experience={profile.experience} />}
              </Fragment>
            )}
          </div>

          <div className='profile-edu bg-white p-2'>
            <h2 className='text-primary'>Education</h2>
            {profile.education === null ? (
              <h4>No education credentials</h4>
            ) : (
              <Fragment>
                {<ProfileEducation education={profile.education} />}
              </Fragment>
            )}
          </div>

          <div className='profile-github'>
            <h2 className='text-primary my-1'>
              <i className='fab fa-github'></i> Github Repos
            </h2>
            {profile.githubusername === null ? (
              <Spinner />
            ) : (
              <ProfileGithub githubusername={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
