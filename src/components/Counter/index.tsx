import { decrement, increment, selectCount } from "../../store/count";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Count = () => {

    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const handleIncrement = () => {
        dispatch(increment());
    };
    const handleDecrement = () => {
        dispatch(decrement());
    };

    return (

        <div>
            <button onClick={handleIncrement}>+</button>
            <label>{count}</label>
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default Count;