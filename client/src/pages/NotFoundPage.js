import React from 'react';

import NotFound from '../components/NotFound'; // Import your NotFound component

const NotFoundPage = () => {
  return (
    <div>
     
      <main className="not-found-page">
        <NotFound /> {/* Render the NotFound component */}
      </main>
   
    </div>
  );
};

export default NotFoundPage;