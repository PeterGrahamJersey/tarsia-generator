import React,{ createContext, useContext, useState } from 'react'
import data from '../../data'

export const ContextData = createContext()

export const DataProvider = ({ initalState = {}, children }) => {
  const [values, setValues] = useState(initalState)

  return (
    <ContextData.Provider value={{ ...data, values, setValues }}>
      {children}
    </ContextData.Provider>
  );
}

export const DataConsumer = ContextData.Consumer;

export const useData = () => useContext(ContextData);