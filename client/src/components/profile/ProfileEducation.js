import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  return (
    <Fragment>
      {education.map((edu) => (
        <div key={edu._id}>
          <h3>{edu.school}</h3>
          <p>
            <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
            <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
          </p>
          <p>
            <strong>Degree: </strong>
            {edu.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {edu.fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong>
            {edu.description}
          </p>
        </div>
      ))}
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
