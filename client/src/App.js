import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from './apollo-client'; // Import your configured Apollo Client
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
// import Camping from './components/Camping'; // Import your component for displaying Camping items
// import Hiking from './components/Hiking'; // Import your component for displaying Hiking items (if applicable)
// import Snow from './components/Snow'; // Import your component for displaying Snow items (if applicable)
// ... Import other components for different categories

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Router>
        <div>
          <Header />
          <NavigationBar />
          {/* <Switch> */}
            {/* <Route path="/category/camping" component={Camping} />
            <Route path="/category/hiking" component={Hiking} />
            <Route path="/category/snow" component={Snow} /> */}
            {/* Add routes for other categories */}
            {/* <Route path="/" exact> */}
              {/* Home or default page */}
            {/* </Route> */}
          {/* </Switch> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;