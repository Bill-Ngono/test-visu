import './Screens.css';

import { useDispatch, useSelector } from 'react-redux';
import { waitForSwap } from '../features/stepReducer';

import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import batteryFull from '../Images/battery_pleine.png'
import { selectSoc, selectStep } from '../utils/selectors';
import store from '../utils/store';

export function SwapCompleted(props) {
    const dispatch = useDispatch()
    const step = useSelector(selectStep())
    const soc = parseInt(useSelector(selectSoc()))

    const backTime = window.setTimeout(() => {
        const currentStep = store.getState().steps.step
        if (currentStep === 'swap-completed' ) {
            dispatch(waitForSwap())
        }
        console.log('exec whenever');
    }, 8000);

    if (soc >= 70) {
        return (
            <ScreenBox>
                <MessageBox color="Blue" logo="color" step={3}>
                    <p className='message-main text-center p-0 mt-5'>
                        Swap terminé !
                    </p>
                    <p className='message-alt text-center customStyle_txt'>
                        Bonne route =)
                    </p>
                </MessageBox>
                <GraphicsBox>
                    <img className='w-50' src={batteryFull} alt="Battery full" />
                </GraphicsBox>
            </ScreenBox>
        )
    }
    else {
        return (
            <ScreenBox>
                <MessageBox color="Orange" logo="color" step={3}>
                    <p className='message-main text-center p-0 mt-5'>
                        Swap terminé !
                    </p>
                    <p className='message-alt text-center customStyle_txt'>
                        Bonne route =)
                    </p>
                </MessageBox>
                <GraphicsBox>
                    <img className='w-50' src={batteryFull} alt="Battery full" />
                </GraphicsBox>
            </ScreenBox>
        )
    }


    
}