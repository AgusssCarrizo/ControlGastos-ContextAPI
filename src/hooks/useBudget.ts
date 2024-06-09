import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    //Mensaje al usuario que quiera usar nuestro Hooks
    throw new Error("useBudget must be used a BudgetProvider");
  }
  return context;
};
