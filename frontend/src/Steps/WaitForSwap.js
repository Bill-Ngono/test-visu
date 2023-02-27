import './Screens.css';

import { faSignal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';

import video from '../Videos/BSS_visu_step_1.mp4';

export function WaitForSwap() {
    return (
        <ScreenBox>
            <MessageBox color="Orange" logo="grey" step={0}>
                <p className='message-main p-0 mt-5'>
                    Approchez votre batterie de la station d’échange pour commencer <FontAwesomeIcon icon={faSignal} />
                </p>
                <div class="Line my-4 p-0"></div>
                <p className='message-alt p-0'>
                    Positionnez la batterie en face du symbole <FontAwesomeIcon icon={faSignal} /> <strong>à moins d’un mètre</strong> pour que l’opération puisse commencer.
                </p>
            </MessageBox>
            <GraphicsBox>
                <video src={video} style={{ maxWidth: '100%' }} autoplay="true" loop="true"/>
            </GraphicsBox>
        </ScreenBox>
    )
}