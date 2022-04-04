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
    loggingId: string
    logout: () => void
    config: any
    isLoggedIn: boolean
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
};


export const LoginContext = createContext({} as LoginContextData);

type ProviderProps = {
    children: ReactNode;
};

export function LoginContextProvider({ children }: ProviderProps): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggingId, setLoggingId] = useState<string>('')
    const [config, setConfig] = useState()

    /* useEffect(() => {
        const loggedIn = localStorage.getItem('flashcard/userId')

        if (!!loggedIn) {
            setLoggingId(loggedIn)

            const url = `http://localhost:3004/config?userId=${loggingId}`
            fetch(url).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
                .then((data) => setConfig(data))
                .catch((error) => console.log(error, 'something went wrong'))


        }
    }, []) */
    // console.log(config)

    const logout = () => {
        localStorage.removeItem('flashcard/userId');
        window.location.reload();
    }


    return (
        <LoginContext.Provider
            value={{ loggingId, logout, config, isLoggedIn, setIsLoggedIn }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = (): LoginContextData => {
    return useContext(LoginContext);
};