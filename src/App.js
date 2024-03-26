import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import './App.css';

const { Text } = Typography;

function App() {


  const [blocks, setBlocks] = useState([]);
  const [showAddButtons, setShowAddButtons] = useState(true);

  const addBlock = (type) => {
    const newBlock = { id: Date.now().toString(), type, content: type === 'text' ? '' : null };
    setBlocks([...blocks, newBlock]);
    setShowAddButtons(false);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const renderBlocks = () => {


    return blocks.map((block) => (
      <div key={block.id} className="block">
      <Button type="primary" danger onClick={() => removeBlock(block.id)} className="remove-btn"
      style={{ backgroundColor: 'black', color: 'white', padding: '2px 16px', borderRadius:'20px' }}>
          Remove
        </Button>
        {block.type === 'text' && renderTextBlock(block)}
        {block.type === 'picture' && renderPictureBlock(block)}
        
      </div>
    ));
  };

 

  const renderTextBlock = (block) => {
    return (
      <>
        
        <textarea
          className="text-input"
          value={block.content}
          onChange={(e) => handleTextChange(e, block.id)}
          // Add onFocus and onBlur handlers if needed
        />
        {/* Add any additional elements or UI components for text blocks */}
        <Text type="secondary">Words remaining: {250 - countWords(block.content)}</Text>
      </>
    );
  };

  const renderPictureBlock = (block) => {
    return (
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, block.id)} />
      // You can add additional UI elements or components for picture blocks
    );
  };

  const handleTextChange = (e, id) => {
    const { value } = e.target;
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content: value } : block)));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBlocks(blocks.map((block) => (block.id === id ? { ...block, content: event.target.result } : block)));
      };
      reader.readAsDataURL(file);
    }
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="App">
      <header className="App-header">
        {showAddButtons ? (
          <div className="center-block">
            <Button onClick={() => setShowAddButtons(false)}  style={{ borderRadius:'20px' }}>Add Block</Button>
          </div>
        ) : (
          <div className="center-block">
            <Button onClick={() => addBlock('text')}  style={{ borderRadius:'20px' }}>Add Text </Button>
            <Button onClick={() => addBlock('picture')}  style={{ borderRadius:'20px' }}>Add File </Button>
          </div>
        )}
      </header>
      <div className="blocks-container">
        {renderBlocks()}
      </div>
    </div>
  );
}

export default App;