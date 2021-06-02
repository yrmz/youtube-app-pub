import { useTags } from 'hooks/backend/tag';
import React from 'react';

type ContextProps = {
  useTags: TUseTags;
};
type ProviderProps = {};

export const PrivateContext = React.createContext<ContextProps>({
  useTags: [
    [],
    {
      getTags: () => {},
      editTag: (res: {
        tagId?: number;
        name: string;
        description: string;
      }) => {},
      deleteTag: (tagId: number) => {},
    },
  ],
});

export const PrivateProvider: React.FC<ProviderProps> = ({ children }) => {
  const tags = useTags();
  return (
    <PrivateContext.Provider value={{ useTags: tags }}>
      {children}
    </PrivateContext.Provider>
  );
};
