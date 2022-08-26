import './Screens.css';

import { ScreenBox } from '../Components/ScreenBox';
import { MessageBox } from '../Components/MessageBox';
import { GraphicsBox } from '../Components/GraphicsBox';


export function WaitForSwap() {
    return (
        <ScreenBox>
            <MessageBox color="Orange" logo="grey" step={0}>
                <p className='message-main py-5'>
                    Approchez votre batterie de la station d’échange pour commencer
                </p>
                <div class="Line"></div>
                <p className='py-5 message-alt'>
                    Positionnez la batterie en face du symbole<span class="text-style-1">à moins d’un mètre</span>pour que l’opération puisse commencer.
                </p>
            </MessageBox>
            <GraphicsBox>GraphicsBox</GraphicsBox>
        </ScreenBox>
    )
}