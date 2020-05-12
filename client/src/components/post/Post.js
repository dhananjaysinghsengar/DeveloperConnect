import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    console.log(match.params.id);
    getPost(match.params.id);
  }, [getPost]);

  return <div>test</div>;
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  post: state.post,
});

export default connect(mapStateToProp, { getPost })(Post);
