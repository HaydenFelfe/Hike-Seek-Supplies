import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApolloClient from './apollo-client';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Camping from './pages/Camping';
import Hiking from './pages/Hiking';
import Snow from './pages/Snow';
import Water from './pages/Water';
import Travel from './pages/Travel';
import Used from './pages/Used';
import Deals from './pages/Deals';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Router>
        <div>
          <Header />
          <NavigationBar />

          <Routes>
            <Route path="/" element={<HomePage />} />{' '}
            {/* Render HomePage for the root route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/camping" element={<Camping />} />
            <Route path="/hiking" element={<Hiking />} />
            <Route path="/snow" element={<Snow />} />
            <Route path="/water" element={<Water />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/used" element={<Used />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/product/:slug" element={<ProductPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
