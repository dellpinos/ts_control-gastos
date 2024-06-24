import { useState } from "react";
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


export default function ExpenseForm() {

    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });

    return (
        <form className="space-y-5">
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input
                    type="text"
                    name="expenseName"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="p-2 bg-slate-100"
                    value={expense.expenseName}
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
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select name="category" id="category" className="p-2 bg-slate-100" value={expense.category}>
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
                    />
            </div>


            <input
                type="submit"
                value="Registrar Gasto"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
        </form>
    )
}