import React, { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = (props) => {
  const { children } = props;

  const [ocultarMenu, setOcultarMenu] = useState(false);

  const showMenu = () => {
    setOcultarMenu(false);
  };
  const hideMenu = () => {
    setOcultarMenu(true);
  };

  return (
    <UIContext.Provider
      value={{
        ocultarMenu,
        showMenu,
        hideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
