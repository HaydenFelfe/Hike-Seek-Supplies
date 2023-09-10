import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <div className="loading-box">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
