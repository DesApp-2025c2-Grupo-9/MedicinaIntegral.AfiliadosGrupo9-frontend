import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null si no está logueado

return (
    <UserContext.Provider value={{ user, setUser }}>
    {children}
    </UserContext.Provider>
);
}

