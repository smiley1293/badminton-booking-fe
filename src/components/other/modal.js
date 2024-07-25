import { useRef, useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, closeModal, acceptModal = () => {}, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
                <div className='flex flex-row-reverse'>
                    <button className="py-[6px] px-[56px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]" onClick={closeModal}>Cancel</button>
                    <button className="py-[6px] px-[56px] me-[10px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]" onClick={acceptModal}>Accept</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;