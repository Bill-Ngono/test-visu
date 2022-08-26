import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import './Screens.css';

export function ErrorPage() {
    return (
        <ScreenBox >
            <MessageBox color="Orange">
                <p className='message-main py-5'>
                    Oops :(
                    <br />
                    Erreur de détection.
                </p>
                <p className='py-5 message-bubble'>
                    Aie, nous n’arrivons pas à lire correctement votre batterie
                </p>
                <p className='py-5 message-alt'>
                    Réessayez l'opération.
                </p>
            </MessageBox>
            <GraphicsBox>Photo</GraphicsBox>
        </ScreenBox>
    )
}