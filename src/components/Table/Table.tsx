export const Table: React.FC = ({ children }) => {
  return (
    <table className='table-auto min-w-full divide-y divide-gray-300 border-transparent rounded-md overflow-hidden shadow-lg'>
      {children}
    </table>
  );
};
