import './Screens.css';

import { useDispatch } from 'react-redux';
import { waitForSwap } from '../features/goToPage';

import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';

export function SwapCompleted(props) {
    const dispatch = useDispatch()
    setTimeout(() => {
        dispatch(waitForSwap())
    }, 10000);
    return (
        <ScreenBox>
            <MessageBox color="Blue" logo="color" step={3}>
                <p className='message-main py-5'>
                    Swap terminé !
                </p>
                <div class="Line"></div>
                <p className='py-5 message-alt'>
                    Bonne route !
                </p>
            </MessageBox>
            <GraphicsBox>GraphicsBox</GraphicsBox>
        </ScreenBox>
    )
}