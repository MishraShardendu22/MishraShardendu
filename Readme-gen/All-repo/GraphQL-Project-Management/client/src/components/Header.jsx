/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import graphqlIcon from '../assets/graph_W.webp'; // Using WebP icon
import icons from '../assets/icons.jpg';
import { Github } from 'lucide-react';
import "../index.css";

// import { GitHub, LinkedIn } from 'lucide-react'; // Import icons from lucide-react

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black" style={{ padding: '15px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={graphqlIcon}
          alt="GraphQL Logo"
          style={{
            width: '50px',
            height: '50px',
            marginRight: '15px',
            animation: 'spin 8s linear infinite', // Slower spin duration (10 seconds)
          }}
        />
          <span className='text-indigo-400 hover:text-yellow-400 hover:duration-300 duration-300'>
            Project Management Hub
          </span>  
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex align-items-center ms-auto">
          <a href="https://github.com/MishraShardendu22" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center me-4">
            <Github size={30} color="white" className="me-2" />
            <span className="text-indigo-400 hover:text-yellow-400 hover:duration-300 duration-300">Visit my GitHub Project Account</span>
          </a>
          <a href="https://www.linkedin.com/in/shardendumishra22/" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
            <img src={icons} alt="Logo of ShardenduMishraCreate's" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <span className="text-indigo-400 hover:text-yellow-400 hover:duration-300 duration-300">Join me on LinkedIn</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
