import React from "react";
import Link from "next/link";
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header className='fixed w-full top-0 bg-gray-800 text-gray-200'>
        <div className='container mx-auto w-auto py-6'>
          <Link href='/'>
            <a>
              <h1 className='text-2xl'>Star Wars Fan Page</h1>
            </a>
          </Link>
        </div>
      </header>

      <main className='min-h-screen min-w-screen bg-gray-800 text-gray-200'>
        {/* Header */}
        {children}
      </main>
    </>
  );
};

export default Layout;
