import {useReducer} from "react";

type CounterState = {

    count: number;
    lastAction: string;
    time: string;
}


type Action =
| {type: "INCREASE"}
| {type: "DECREASE"}
| {type: "RESET"};


const initialState: CounterState = {
    count: 0,
    lastAction: "",
    time: "",
}

const getCurrentTime = () => new Date().toLocaleTimeString();


// ο τύπος του state είναι CounterState, ο τύπος του action είναι Action και ο τύπος του return σε αυτή την περίπτωση θέλουμε να είναι ίδιος με CounterState
// Αν π.χ στο return θέλαμε να εμφανίζεται και ένα title τότε θα φτιάχναμε νέο type και θα βάζαμε αυτό στη θέση του CounterState για το return

function reducer (state:CounterState, action:Action): CounterState {
    switch (action.type) {
        case "INCREASE":
            return {
                count: state.count + 1,
                lastAction: "Increase",
                time: getCurrentTime()
            }
        case "DECREASE":
            return state.count > 0
       ? {
                count: state.count - 1,
                lastAction: "Decrease",
                time: getCurrentTime()
            }
            :state;


        case "RESET":
            return {
                count: 0,
                lastAction: "Reset",
                time: getCurrentTime()
            };

            default:
                return state;
    }


}


export const useCounterwithReducer = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const increase = () => dispatch({type: "INCREASE"});
    const decrease = () => dispatch({type: "DECREASE"});
    const reset = () => dispatch({type: "RESET"});

    return {
        count: state.count,
        lastAction: state.lastAction,
        time: state.time,
        increase,
        decrease,
        reset,

    };

};