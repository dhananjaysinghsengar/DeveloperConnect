import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return (
    <Fragment>
      {experience.map((exp) => (
        <div key={exp._id}>
          <h3 className='text-dark'>{exp.company}</h3>
          <p>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
            {!exp.to ? 'Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
          </p>
          <p>
            <strong>Position: </strong>
            {exp.title}
          </p>
          <p>
            <strong>Description: </strong>
            {exp.description}
          </p>
        </div>
      ))}
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
