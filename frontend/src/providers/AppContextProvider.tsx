import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { IUser } from "../interfaces/UserInterface";
import type { AxiosResponse } from "axios";
import { HTTPContext } from "./HTTPProvider";
import type { paymentType } from "../interfaces/paymentType";

interface IAppContext {
  user: IUser | null;
  registerUser: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AxiosResponse<any> | null>;
  loginUser: (
    email: string,
    password: string,
  ) => Promise<AxiosResponse<any> | null>;
  logoutUser: () => Promise<AxiosResponse<any> | null>;
  checkAuthentication: () => void;
  getUserData: () => IUser | null;
  getAllCurrencies: () => Promise<AxiosResponse<any> | null>;
  getCurrencyByISOCode: (
    currencyCode: string,
  ) => Promise<AxiosResponse<any> | null>;
  getCurrencyByCountry: (
    currencyCountry: string,
  ) => Promise<AxiosResponse<any> | null>;
  getAllCategories: () => Promise<AxiosResponse<any> | null>;
  getCategoryById: (categoryId: string) => Promise<AxiosResponse<any> | null>;
  getCategoryByName: (
    categoryName: string,
  ) => Promise<AxiosResponse<any> | null>;
  createCategory: (
    name: string,
    note: string,
    subcategory: any[],
  ) => Promise<AxiosResponse<any> | null>;
  updateCategory: (
    categoryId: string,
    name: string,
    note: string,
    subcategory: any[],
  ) => Promise<AxiosResponse<any> | null>;
  deleteCategory: (categoryId: string) => Promise<AxiosResponse<any> | null>;
  createTransaction: (
    transactionData: any,
  ) => Promise<AxiosResponse<any> | null>;
  error: null | string;
}

export interface ITransaction extends Document {
  userId: string;
  amount: number;
  currency: string;
  category: string;
  paymentMethod: string;
  store: string;
  name: string;
  note?: string;
  paymentType: paymentType;
  date: Date;
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
  getAllCategories: async () => null,
  getCategoryById: async () => null,
  getCategoryByName: async () => null,
  createCategory: async () => null,
  updateCategory: async () => null,
  deleteCategory: async () => null,
  createTransaction: async () => null,
  error: null,
});

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<IUser | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { get, post, del, put, error } = useContext(HTTPContext);

  useEffect(() => {
    async function fetchData() {
      await checkAuthentication();
      // Check authentication is complete
      setLoading(false);
    }
    fetchData();
  }, []);

  async function registerUser(name: string, email: string, password: string) {
    const response = await post("home/register", { name, email, password });
    response && (await checkAuthentication());
    return response;
  }

  async function loginUser(email: string, password: string) {
    const response = await post("home/login", { email, password });
    response && (await checkAuthentication());
    return response;
  }

  async function logoutUser() {
    const response = await post("home/logout", null);
    await checkAuthentication();
    return response;
  }

  async function checkAuthentication() {
    const response = await get("user/");
    response
      ? setAuthenticatedUser(response.data.user)
      : setAuthenticatedUser(null);
  }

  function getUserData() {
    return authenticatedUser;
  }

  async function getAllCurrencies() {
    return await get("currency/");
  }

  async function getCurrencyByISOCode(currencyCode: string) {
    return await get(`currency/code/${currencyCode}`);
  }

  async function getCurrencyByCountry(currencyCountry: string) {
    return await get(`currency/country/${currencyCountry}`);
  }
  async function getAllCategories() {
    return await get("category/");
  }
  async function getCategoryById(categoryId: string) {
    return await get(`category/id/${categoryId}`);
  }
  async function getCategoryByName(categoryName: string) {
    return await get(`category/name/${categoryName}`);
  }
  async function createCategory(
    name: string,
    note: string,
    subcategory: any[],
  ) {
    return await post("category/create", { name, note, subcategory });
  }
  async function updateCategory(
    categoryId: string,
    name: string,
    note: string,
    subcategory: any[],
  ) {
    return await put(`category/id/${categoryId}`, { name, note, subcategory });
  }
  async function deleteCategory(categoryId: string) {
    return await del(`category/id/${categoryId}`);
  }
  async function createTransaction(transactionData: ITransaction) {
    return await post("transaction/create", transactionData);
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
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
    createTransaction,
    error,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {loading ? null : children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
