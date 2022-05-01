import React from 'react';

interface ModalProps {
    show: boolean;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }

const Modal: React.FC<ModalProps> = ({ show, children, onClick }) => {
  if (show) {
    return (
      <div id="modal" data-testid="modal" className="isolation" onClick={onClick} role="presentation">
        <div className="bg-opacity-25 fixed inset-0 z-50 bg-black">
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
