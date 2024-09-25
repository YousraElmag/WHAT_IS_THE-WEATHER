import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const NavBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  const handelkey=(e)=>{
    if(e.key== 'Enter'){
      handleSearchClick()
    }

  }
  

  return (
   
    <div>
      <h4 className='logo'>WHAT IS<span>THE WEATHER</span>  </h4>
      <input
        type="text"
        value={query}
        
        onChange={handleInputChange}
      
        placeholder="Enter city or country"
        onKeyPress={handelkey}
        style={{
          marginBottom: '10px',
          width: '300px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          
        }}
      />

      <button 
        onClick={handleSearchClick}
        style={{ padding: '8px 12px', marginTop: '10px' }}
      >
        Search
      </button>
         {location.pathname !== '/' && (
          <button 
            onClick={() => navigate('/')}
            style={{ padding: '8px 12px', marginTop: '10px', marginLeft: '10px' }}
          >
            Home
          </button>
        )}
    </div>
  
  );
};

export default NavBar;
