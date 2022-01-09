import React, {
    createContext,
    ReactNode,
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";



type LoginContextData = {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    loggingAddress: string
    setLoggingAddress: Dispatch<SetStateAction<string>>
    logout: () => void
};


export const LoginContext = createContext({} as LoginContextData);

type ProviderProps = {
    children: ReactNode;
};

export function LoginContextProvider({ children }: ProviderProps): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggingAddress, setLoggingAddress] = useState<string>('')

    useEffect(() => {
        const loggedIn = localStorage.getItem('flashcard/email')

        if (!!loggedIn) {
            setIsLoggedIn(true)
            setLoggingAddress(loggedIn)
        }
    }, [])


    const logout = () => {
        localStorage.removeItem('flashcard/email');
        window.location.reload();
    }



    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, loggingAddress, setLoggingAddress, logout }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = (): LoginContextData => {
    return useContext(LoginContext);
};