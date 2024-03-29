import { useContext, useEffect } from "react";
import { UIContext } from "../context/UIContext";

const useHideMenu = (ocultar) => {
  const { showMenu, hideMenu } = useContext(UIContext);

  useEffect(() => {
    if (ocultar) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ocultar, hideMenu, showMenu]);
};

export default useHideMenu;
