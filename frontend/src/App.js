import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importing the CSS file

function App() {
  const [texts, setTexts] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/texts');
      setTexts(response.data);
      setSavedCount(response.data.length);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };

  const handleSubmit = () => {
    const content = prompt('Enter plain text:');
    if (content && content.trim()) {
      addText(content);
    }
  };

  const addText = async (content) => {
    try {
      await axios.post('http://localhost:5000/api/texts', { content });
      fetchTexts();
      setSavedCount(savedCount + 1);
    } catch (error) {
      console.error('Error adding text:', error);
    }
  };

  const startEdit = (id, content) => {
    setEditingId(id);
    setEditingContent(content); // Set to the current text content
  };

  const saveEdit = async () => {
    if (!editingContent.trim()) {
      alert('Content cannot be empty!');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/texts/${editingId}`, { content: editingContent });
      fetchTexts();
      setEditingId(null);
      setEditingContent(''); // Clear after save
    } catch (error) {
      console.error('Error editing text:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent(''); // Clear on cancel
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      try {
        await axios.delete(`http://localhost:5000/api/texts/${id}`);
        fetchTexts();
        setDeletedCount(deletedCount + 1);
        if (editingId === id) {
          setEditingId(null);
          setEditingContent(''); // Clear if deleting the edited item
        }
      } catch (error) {
        console.error('Error deleting text:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Text Management App</h1>
      <div className="timestamp">
        {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </div>
      <button className="button" onClick={handleSubmit}>Add Text</button>
      <div className="text-list">
        <h2>Saved Texts</h2>
        <div className="counter">
          Total Saved: {savedCount} | Total Deleted: {deletedCount}
        </div>
        {texts.map((text) => (
          <div key={text._id} className={`text-item ${editingId === text._id ? 'edit-mode' : ''}`}>
            <div className="text-content">{text.content}</div>
            {editingId === text._id && (
              <input
                className="text-input"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
            )}
            {editingId === text._id ? (
              <div className="button-group">
                <button className="button" onClick={saveEdit}>Save</button>
                <button className="button" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="button-group">
                <button className="button" onClick={() => startEdit(text._id, text.content)}>Edit</button>
                <button className="button" onClick={() => handleDelete(text._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;