import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import useBudget from "../hooks/useBudget";


export default function ExpenseForm() {

    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });

    const { dispatch, state, remainingBudget } = useBudget();
    const [ error, setError ] = useState('');
    const [ previousAmount, setPreviousAmount ] = useState(0)

    useEffect(()=> {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currecntExpense => currecntExpense.id === state.editingId)[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        });
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        
        const { name, value} = e.target;
        const isAmountField = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        });
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        // Validar que no haya presupuesto negativo
        if( (expense.amount - previousAmount) > remainingBudget){
            setError('Este gasto supera el presupuesto actual')
            return
        }

        // Agregar o actualizar gasto
        if(state.editingId) {
            dispatch({ type: 'update-expense', payload: {expense: { id: state.editingId, ...expense}} })
        } else {
            dispatch({ type: 'add-expense', payload: { expense }})
        }

        // Reiniciar State
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={ handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{!state.editingId ? 'Nuevo Gasto' : `Editar ${expense.expenseName}` }</legend>


            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input
                    type="text"
                    name="expenseName"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    maxLength={60}
                    className="p-2 bg-slate-100"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 550"
                    className="p-2 bg-slate-100"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select name="category" id="category" className="p-2 bg-slate-100" value={expense.category} onChange={handleChange}>
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Fecha Gasto:</label>
                    <DatePicker
                        className="bg-slate-100 p-2 b-0"
                        value={expense.date}
                        onChange={ handleChangeDate }
                    />
            </div>


            <input
                type="submit"
                value={!state.editingId ? 'Registrar Gasto' : 'Actualizar Gasto' }
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
        </form>
    )
}
