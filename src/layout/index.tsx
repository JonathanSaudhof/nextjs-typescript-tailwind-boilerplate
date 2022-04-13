import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "./stromtrooper.png";
import Head from "next/head";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
        <link rel='shortcut icon' href='./stromtrooper.png' />
      </Head>
      <header className='fixed w-full top-0 bg-gray-800 text-gray-200 shadow-lg'>
        <div className='container mx-auto w-auto py-6 '>
          <Link href='/'>
            <a className='flex gap-6 items-center'>
              <Image
                src={logo}
                alt='logo'
                height={50}
                width={50}
                className='shadow-sm'
              />
              <h1 className='text-2xl italic font-bold'>
                STAR WARS CHARACTERS
              </h1>
            </a>
          </Link>
        </div>
      </header>

      <main className='min-h-screen min-w-screen bg-gray-800 text-gray-200 py-28'>
        {/* Header */}
        {children}
      </main>
    </>
  );
};

export default Layout;
