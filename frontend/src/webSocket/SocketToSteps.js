import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Steps } from "../Steps/Steps";
import { readWebSocket } from "../features/stepReducer";

const SocketToSteps = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(readWebSocket())
    
        return

    }, [dispatch])
    

    return <Steps/>
}

export default SocketToSteps