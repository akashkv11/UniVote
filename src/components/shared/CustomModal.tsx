import React, { useState } from "react";

const CustomModal = () => {
  const [open, setOpen] = useState(false);

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg">
          <p>Modal Content</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </div>
    )
  );
};

export default CustomModal;
