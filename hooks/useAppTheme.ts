import lightTheme from "../components/styles/lightTheme";
import darkTheme from "../components/styles/darkTheme";
import {useSelector} from "react-redux";

export const useAppTheme = () => {
    const currentTheme = useSelector((state) => state.root.theme.currentTheme);
    const themeStyles = currentTheme === 'dark' ? darkTheme : lightTheme;
    return themeStyles;
}