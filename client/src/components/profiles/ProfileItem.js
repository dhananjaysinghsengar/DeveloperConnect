import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company} </span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link className='bt btn-primary' to={`/profile/${_id}`}>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'>{skill}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.prototype = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
