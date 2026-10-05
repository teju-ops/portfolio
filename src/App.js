import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Proficiency from './components/Proficiency';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useReveal } from './useReveal';
import './App.css';

function App() {
  useReveal();
  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home" className="section hero"><Home /></section>
        <section id="proficiency" className="section tone-1"><Proficiency /></section>
        <section id="projects" className="section"><Projects /></section>
        <section id="about" className="section tone-2"><About /></section>
        <section id="contact" className="section"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
