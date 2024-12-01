import React from "react";


const Layout = ({ children, onLogout }) => {
  return (
    
        <main className="p-4 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>
      
  );
};

export default Layout;
