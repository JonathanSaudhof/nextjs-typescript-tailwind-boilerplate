import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <main className='min-h-screen min-w-screen bg-gray-800 text-gray-200'>
      <div className='container mx-auto'>
        <div className='fixed top-0 w-full py-6 bg-gray-800'>
          <h1 className='text-2xl'>Star Wars Fan Page</h1>
        </div>
      </div>
      {children}
    </main>
  );
};

export default Layout;
