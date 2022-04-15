import React from "react";

import Head from "next/head";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next-JS boilerplate</title>
      </Head>
      <header className='fixed w-full top-0 bg-gray-800  shadow-lg'>
        <div className='container mx-auto w-auto py-6 '>Header</div>
      </header>

      <main className='min-h-screen min-w-screen bg-gray-800 text-gray-200 py-28'>
        {children}
      </main>
    </>
  );
};

export default Layout;
