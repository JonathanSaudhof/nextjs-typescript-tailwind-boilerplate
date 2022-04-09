import React, { PropsWithChildren } from "react";

const Layout = (props) => {
  return (
    <main className='min-h-screen min-w-screen bg-gray-800 text-gray-200'>
      {props.children}
    </main>
  );
};

function Test(props) {
  return (
    <main className='min-h-screen min-w-screen bg-gray-800 text-gray-200'>
      {props.children}
    </main>
  );
}

export default Layout;
