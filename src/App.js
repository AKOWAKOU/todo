import React from 'react';
import Header from './components/Header';
import UserTasks from './components/UserTasks';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mx-auto mt-8">
        <UserTasks />
      </div>
    </div>
  );
}

export default App;
