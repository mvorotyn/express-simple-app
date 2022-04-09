import { createContext, useContext } from "react";
import { rootStore } from "../stores/";
export const StoreContext = createContext(rootStore);
StoreContext.displayName = "Store Context";

// export const StoreProvider = ({ children }): JSX.Element => {
//   // const store = useLocalStore(createStore);

//   return (
//     <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
//   );
// };

export const useStore = () => useContext(StoreContext);
