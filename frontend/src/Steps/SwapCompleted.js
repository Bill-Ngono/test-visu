import './Screens.css';

import { useDispatch } from 'react-redux';
import { waitForSwap } from '../features/goToPage';

import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import batteryFull from '../Images/battery_pleine.png'

export function SwapCompleted(props) {
    const dispatch = useDispatch()
    setTimeout(() => {
        dispatch(waitForSwap())
    }, 10000);
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