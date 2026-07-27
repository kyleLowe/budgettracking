import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type {IUser} from '../interfaces/UserInterface';
import type {AxiosResponse} from 'axios';
import { HTTPContext } from './HTTPProvider';


interface IAppContext{
    user: IUser | null;
    registerUser: (name: string, email: string, password: string) => Promise<AxiosResponse<any> | null>;
    loginUser: (email: string, password: string) => Promise<AxiosResponse<any> | null>;
    logoutUser: () => Promise<AxiosResponse<any> | null>;
    checkAuthentication: () => void;
    getUserData: () => IUser | null;
    getAllCurrencies: () => Promise<AxiosResponse<any> | null>;
    getCurrencyByISOCode: (currencyCode: string) => Promise<AxiosResponse<any> | null>;
    getCurrencyByCountry: (currencyCountry: string) => Promise<AxiosResponse<any> | null>;
    error: null | string;
}

const AppContext = createContext<IAppContext>({
    user: null,
    registerUser: async () => null,
    loginUser: async () => null,
    logoutUser: async () => null,
    checkAuthentication: () => {},
    getUserData: () => null,
    getAllCurrencies: async () => null,
    getCurrencyByISOCode: async () => null,
    getCurrencyByCountry: async () => null,
    error: null
})

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
    const [authenticatedUser, setAuthenticatedUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { get, post, error } = useContext(HTTPContext);

      useEffect(() => {
        async function fetchData() {
        await checkAuthentication();
        // Check authentication is complete
        setLoading(false);
        }
        fetchData();
    }, []);

    async function registerUser(name: string, email: string, password: string) {
        const response = await post('home/register', { name, email, password });
        response && (await checkAuthentication());
        return response;
    };

    async function loginUser(email: string, password: string) {
        const response = await post('home/login', { email, password });
        response && (await checkAuthentication());
        return response;
    };

    async function logoutUser() {
        const response = await post('home/logout', null);
        await checkAuthentication();
        return response;
    };

    async function checkAuthentication() {
        const response = await get('user/');
        response ? setAuthenticatedUser(response.data.user) : setAuthenticatedUser(null);
    };

      function getUserData() {
        return authenticatedUser;
    }

    async function getAllCurrencies() {
        return await get('currency/');
    }

    async function getCurrencyByISOCode(currencyCode: string) {
        return await get(`currency/code/${currencyCode}`);
    }

    async function getCurrencyByCountry(currencyCountry: string) {
        return await get(`currency/country/${currencyCountry}`);
    }

    const contextValue: IAppContext = {
        user: authenticatedUser,
        registerUser,
        loginUser,
        logoutUser,
        checkAuthentication,
        getUserData,
        getAllCurrencies,
        getCurrencyByISOCode,
        getCurrencyByCountry,
        error
    }
    return <AppContext.Provider value={contextValue}>{loading ? null : children}</AppContext.Provider>;
}

export {AppContext, AppContextProvider};