import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-300 py-16 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About Pacifico</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Welcome to Pacifico! We are India’s premier e-commerce platform, offering a wide range of products from the latest electronics to everyday essentials. Our mission is to provide a seamless shopping experience with unbeatable prices, fast delivery, and exceptional customer service. Explore our diverse catalog and enjoy shopping from the comfort of your home.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://www.instagram.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.5c-2.6 0-2.9.01-3.9.02-1.5.02-2.6.3-3.3 1.05-.7.7-1.03 1.8-1.05 3.3-.01 1.02-.02 1.3-.02 3.9s.01 2.9.02 3.9c.02 1.5.3 2.6 1.05 3.3.7.7 1.8 1.03 3.3 1.05 1 .01 1.3.02 3.9.02s2.9-.01 3.9-.02c1.5-.02 2.6-.3 3.3-1.05.7-.7 1.03-1.8 1.05-3.3.01-1 .02-1.3.02-3.9s-.01-2.9-.02-3.9c-.02-1.5-.3-2.6-1.05-3.3-.7-.7-1.8-1.03-3.3-1.05-1-.01-1.3-.02-3.9-.02zm0 6.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm0-5.6c2.8 0 3.1.01 4.2.02 1.1.01 1.9.24 2.5.48.6.25 1.1.6 1.5 1.1.4.4.85.9 1.1 1.5.24.6.48 1.4.48 2.5.01 1.1.02 1.4.02 4.2s-.01 3.1-.02 4.2c-.01 1.1-.24 1.9-.48 2.5-.25.6-.6 1.1-1.1 1.5-.4.4-.9.85-1.5 1.1-.6.24-1.4.48-2.5.48-1.1.01-1.4.02-4.2.02-2.8 0-3.1-.01-4.2-.02-1.1-.01-1.9-.24-2.5-.48-.6-.25-1.1-.6-1.5-1.1-.4-.4-.85-.9-1.1-1.5-.24-.6-.48-1.4-.48-2.5-.01-1.1-.02-1.4-.02-4.2 0-2.8.01-3.1.02-4.2.01-1.1.24-1.9.48-2.5.25-.6.6-1.1 1.1-1.5.4-.4.9-.85 1.5-1.1.6-.24 1.4-.48 2.5-.48 1.1-.01 1.4-.02 4.2-.02z"/>
            </svg>
          </a>
          <a 
            href="https://www.facebook.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5 4h-1.5c-1.4 0-2.5 1.1-2.5 2.5v1.5h-1.5c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h1.5v5h2v-5h1.5c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5zm-3 4h1.5v1.5h-1.5v-1.5zm0 3h1.5v5h-1.5v-5zm4-8h-6c-1.1 0-2 .9-2 2v1.5h-1.5c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h1.5v5h2v-5h1.5c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-1.5v-1c0-.6.4-1 1-1h1.5v-2z"/>
            </svg>
          </a>
          <a 
            href="https://twitter.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.6 7.1c.7-.5 1.2-1.1 1.4-1.9-.7.4-1.4.7-2.2.8-.7-.7-1.6-1.1-2.6-1.1-2.1 0-3.8 1.7-3.8 3.8 0 .3.1.6.2.9-3.2-.2-6-1.7-7.8-4.2-.3.5-.5 1.1-.5 1.7 0 1.2.6 2.3 1.6 2.9-.6 0-1.2-.2-1.8-.5 0 0 0 0 0 0 .1 1.6 1.1 3 2.6 3.3-.5.1-1 .1-1.5.1-.4 0-.8 0-1.2-.1.8 2.5 3.1 4.3 5.8 4.3-2.1 1.7-4.8 2.7-7.8 2.7-.5 0-1-.1-1.5-.1 2.7 1.7 5.9 2.7 9.3 2.7 11.2 0 17.3-9.3 17.3-17.3v-.8c1.2-.9 2.2-2 3-3.2-.9.4-1.9.6-2.9.7z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
