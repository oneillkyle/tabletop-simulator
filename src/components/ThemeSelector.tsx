import React from 'react';
import { themes } from '../theme/themes';

export default function ThemeSelector({
    setTheme
}: {
    setTheme: (t: any) => void;
}) {
    return (
        <div className='bg-gray-600 text-gray-100 p-4 rounded-lg shadow'>
            <h3 className='text-lg font-medium mb-2'>🎨 Select Theme</h3>
            <div className='flex flex-wrap gap-2'>
                {Object.entries(themes).map(([key, theme]) => (
                    <button
                        key={key}
                        onClick={() => setTheme(theme)}
                        className='px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded'>
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
