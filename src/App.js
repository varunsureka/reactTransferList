import React, { useState } from 'react';
import './App.css';
import TransferList from './components/TransferList';

const App = () => {
  const items = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
    { id: 4, label: 'Item 4' },
    { id: 5, label: 'Item 5' },
  ];

  return (
    <div>
      <h1>React Transfer List</h1>
      <TransferList items={items} />
    </div>
  );
};

export default App;