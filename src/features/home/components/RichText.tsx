import React from 'react';

const RichText: React.FC<{ children: React.ReactNode; as?: 'h2' | 'h3' | 'p' }> = ({ children, as = 'h2' }) => { // section heading/paragraph wrapper
  return (
    <div className="flex-column__grid">
      {React.createElement(as, { className: 'richtext-topic' }, children)} {/* dynamic tag */}
    </div>
  );
};

export default RichText;
