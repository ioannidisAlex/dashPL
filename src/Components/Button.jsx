import { useState } from 'react';

export const Button = ({label, onClick, type}) => {
    return (
        <button type={type} onClick={onClick} className='px-2 py-1 text-black rounded-xl border-1 select-none' style={{ fontSize: '80%', borderColor: 'gold', borderWidth: '0.5px' }}>
            {label}
        </button>
    );
}