import { useState } from 'react';

export const Button = ({label, onClick}) => {
    return (
        <button onClick={onClick} className='px-2 py-1 text-white rounded-xl border-1 bg-black select-none'>
            {label}
        </button>
    );
}