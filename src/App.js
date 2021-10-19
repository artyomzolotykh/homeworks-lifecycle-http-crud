import React, { useState, useEffect } from 'react';
import './App.css';
import Item from './components/Item';

function App() {
  const url = 'http://localhost:7777/notes/';

  const [message, setMessage] = useState('');
  const [listing, setListing] = useState([]);
  const [reload, setReload] = useState(0);

  const handleMessageChange = evt => {
    const {value} = evt.target;
    setMessage(value);
  }

  const handleSubmit = evt => {
    const id = listing.length > 0 ? listing[listing.length - 1].id + 1 : 0;

    evt.preventDefault();
    const newItem = {
      "id": id,
      "content": message
    }
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newItem)
    })
      .then(setReload(Math.random()))
      .then(setMessage(''));
  }

  const removeItem = id => {
    fetch(url + id, {
      method: 'DELETE'
    })
      .then(setReload(Math.random()));
  }

  const reloadPage = () => {
    setReload(Math.random());
  }

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(commits => setListing(commits))
  }, [reload]);

  return (
    <div className="App">

      <div className="header">
        <span>Notes</span>
        <button onClick={reloadPage}>↻</button>
      </div>

      <div className="wrapper">
        {listing.map(item => <Item key={item.id} item={item} removeItem={removeItem} />)}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="title">
          New Note
        </div>
        <textarea value={message} onChange={handleMessageChange} />
        <button type="submit">→</button>
      </form>

    </div>
  );
}

export default App;