import {useReducer} from "react";

type TodoProps = {
    id: number;
    text: string;
}

type Action =
    | {type: "ADD"; payload: string}
    | {type: "DELETE"; payload: number}




const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {

    switch (action.type) {
        case "ADD":
            //Θέλω νέο στοιχείο όταν θα πατάω Add με τύπο ίδιο με TodoProps άρα φτιάχνω νέα μεταβλητή με τα συγκεκριμένα στοιχεία
            const newTodo: TodoProps = {
                id: Date.now(),
                text: action.payload,
            };
            // επέστρεψε τα προηγούμενα στοιχεία της λίστας συν το νέο
            return [...state, newTodo];

        case "DELETE":
            return state.filter(item => item.id !== action.payload);


        default:
            return state;
    }

};



export const useToDoReducer = () => {

    const [state, dispatch] = useReducer(todoReducer, []);

    const addItem = (text: string) => dispatch({ type: "ADD", payload: text });
    const deleteItem = (id: number) => dispatch({ type: "DELETE", payload: id });


    return {
        state,
        addItem,
        deleteItem,
    };

}