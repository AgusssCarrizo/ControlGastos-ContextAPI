import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpense: number;
  remainingBudget: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpense = useMemo(
    () =>
      state.expenses.reduce(
        (total, expense) => total + parseInt(expense.amount.toString(), 10),
        0
      ),
    [state.expenses]
  );
  const remainingBudget = state.budget - totalExpense;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpense,
        remainingBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
