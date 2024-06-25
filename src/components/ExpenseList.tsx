import useBudget from "../hooks/useBudget";
import { useMemo } from "react";
import { ExpenseDetail } from "./ExpenseDetail";

export default function ExpenseList() {

    const { state } = useBudget();
    const isEmpty = useMemo( () => state.expenses.length === 0, [state.expenses]);

  return (
    <div className="mt-10">
        {isEmpty ? <p className="text-gray-600 font-bold">No hay gastos aún</p> : (
            <>
                <p className="text-gra-600 text-2xl font-bold my-5">Listado de Gastos</p>
                {state.expenses.map( expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    
                    />
                ))}
            </>
        )}
    </div>
  )
}
