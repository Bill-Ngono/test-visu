import './Screens.css';

import { ScreenBox } from '../Components/ScreenBox';
import { MessageBox } from '../Components/MessageBox';
import { GraphicsBox } from '../Components/GraphicsBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faHourglassHalf, faVolumeHigh, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'



export function WaitForSwap() {
    return (
        <ScreenBox>
            <MessageBox color="Orange" logo="grey" step={0}>
                <p className='message-main'>
                    Approchez votre batterie de la station d’échange pour commencer <FontAwesomeIcon icon={faSignal} />
                </p>
                <div class="Line my-4"></div>
                <p className='message-alt'>
                    Positionnez la batterie en face du symbole <FontAwesomeIcon icon={faSignal} /> <span class="text-style-1">à moins d’un mètre</span> pour que l’opération puisse commencer.
                </p>
            </MessageBox>
            <GraphicsBox>GraphicsBox</GraphicsBox>
        </ScreenBox>
    )
}