import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepo } from '../../actions/profile';

const ProfileGithub = ({ githubusername, getGithubRepo, repos }) => {
  useEffect(() => {
    getGithubRepo(githubusername);
  }, [getGithubRepo, githubusername]);

  return (
    <Fragment>
      {repos.map((repo) => (
        <div className='repo bg-white p-1 my-1' key={repo.id}>
          <div>
            <h4>
              <a
                href={repo.owner.html_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge badge-dark'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='badge badge-light'>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  getGithubRepo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  githubusername: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepo })(ProfileGithub);
