import React, {createContext, useContext, ReactNode} from 'react';

type CommunityContextData = {
  // authData?: AuthDataResponse;
  // loading: boolean;
  // signIn(data: AuthDataRequest): Promise<void>;
  // signOut(): void;
  // signUp(data: PasswordCreationRequest): Promise<void>;
  // signInSSO(data: AuthDataResponse): Promise<void>;
  // loadStorageData(): Promise<void>;
};

const CommunityContext = createContext<CommunityContextData>(
  {} as CommunityContextData,
);

interface CommunityProviderProps {
  children: ReactNode;
}
const CommunityProvider = ({children}: CommunityProviderProps) => {
  return (
    <CommunityContext.Provider value={{}}>{children}</CommunityContext.Provider>
  );
};

function useCommunity(): CommunityContextData {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error('useCommunity must be used within an Community Provider');
  }

  return context;
}

export {CommunityContext, CommunityProvider, useCommunity};
