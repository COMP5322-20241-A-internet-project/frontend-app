import React, { createContext, useMemo, useState } from 'react';

export const StateContext = createContext(null);

export default function StateProvider({children}) {
    const [userName, setUserName] = useState(null);
   

    const state = useMemo(() => {
        return {
            userName,
            setUserName: (value) => setUserName(value),
        }
    }, [userName])

    return (
        <StateContext.Provider value={state}>
            {children}
        </StateContext.Provider>
    )
}