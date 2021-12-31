import React, {
    createContext,
    ReactNode,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";



type LoginContextData = {

    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    loggingAddress: string
    setLoggingAddress: Dispatch<SetStateAction<string>>
};


export const LoginContext = createContext({} as LoginContextData);

type ProviderProps = {
    children: ReactNode;
};

export function LoginContextProvider({ children }: ProviderProps): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggingAddress, setLoggingAddress] = useState<string>('')



    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, loggingAddress, setLoggingAddress }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = (): LoginContextData => {
    return useContext(LoginContext);
};