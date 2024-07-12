import React from 'react';
import { useSelector } from 'react-redux';

const SomeComponent = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const state = useSelector(state => state.auth.state);

  return (
    <div>
      <p>isAdmin: {isAdmin ? 'true' : 'false'}</p>
      <p>State: {state}</p>
    </div>
  );
};

export default SomeComponent;
