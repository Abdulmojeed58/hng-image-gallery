import { createContext, useContext, useState } from "react";


type ISearchContext = {
  value: string;
    handleChange: (text: string)=> void;
};

const AuthContext = createContext({} as ISearchContext);

const SearchAppProvider = ({ children }: { children: React.ReactNode }) => {

  const [value, setValue] = useState<string>('');

    const handleChange = (text: string) => {
        setValue(text)
    }

  return (
    <AuthContext.Provider
      value={{ value, handleChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSearchContext: any = () => {
  return useContext(AuthContext);
};

export default SearchAppProvider;
