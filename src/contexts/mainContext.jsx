'use client';
import { createContext, useState } from "react";

export const Context = createContext();

const MainContext = ({ children }) => {
  const state = useState({});

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default MainContext;
