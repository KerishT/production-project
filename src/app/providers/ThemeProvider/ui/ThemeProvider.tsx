import {
    FC, useEffect, useMemo, useState
} from 'react';
import {
    ThemeContext
} from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
    initialTheme?: Theme,
    children?: React.ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
    const { theme: defaultTheme } = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);
    const [isThemeInited, setIsThemeInited] = useState(false);

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const defaultProps = useMemo(
        () => ({ theme, setTheme }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
