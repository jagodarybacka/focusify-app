import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { resetToken } from 'services/spotifyAuth';
import './styles.scss';

const TOKEN_ERROR = 401;
export default function Error({ error }) {
  console.log(error);

  return (
    <div className="Error">
      <h1 className="Error__header">Something went wrong</h1>
      <p className="Error__description">{error.message}</p>

      {error.status === TOKEN_ERROR && (
        <Button onClick={() => resetToken()}>Log in again</Button>
      )}
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.object
};
