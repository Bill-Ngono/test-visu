import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Steps } from "../Steps/Steps";
import { errorPage, insertBattery, pullBattery, waitForSwap, swapCompleted } from '../features/goToPage';


const WebSocketStepTI = () => {

    // const ws = useRef()
    const dispatch = useDispatch()

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
        console.log("Connection opened");
    //   setConnectionOpen(true);
    };

    

    useEffect(() => {
        
        ws.onmessage = (event) => {
            const { slot, key, value } = JSON.parse(event.data)
            console.log(JSON.stringify({ slot, key, value }));
            
            // debugger;
            switch (key) {
                case 'insert-battery':
                    dispatch(insertBattery(value));
                    break;
                case 'pull-battery':
                    dispatch(pullBattery(value));
                    break;
                case 'error-page':
                    dispatch(errorPage(value));
                    break
                case 'wait-for-swap':
                    dispatch(waitForSwap());
                    break
                case 'swap-completed':
                    dispatch(swapCompleted(value));
                    break
                default:
                    dispatch(errorPage('Unknown error'));
            }
        }; 
    
        return () => {
          console.log("Cleaning up...");
          ws.close();
        };
    }, [dispatch])
    

    return (
        <>
            <Steps/>
        </>
    )
}

export default WebSocketStepTI