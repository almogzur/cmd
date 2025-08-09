import {  grey } from '@mui/material/colors';
import React, { createContext, useContext } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    bgColor: string;
    textColor: string
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);



export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const dark = grey[900];
    const light = '#ebf0f1ff';

    const bgColor = isDarkMode ? dark : light;
    const textColor = isDarkMode ? 'white' : 'black';




    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme , bgColor, textColor }}>
            {children}
        </ThemeContext.Provider>
    );
};




export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};