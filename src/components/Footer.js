import React from 'react';

function Footer() {
  return (
    <footer className="text-center py-4 bg-light mt-5">
      <p>&copy; {new Date().getFullYear()} KhetGuru. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
