import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import { selectErrorMessage } from '../features/goToPage';
import { useSelector } from 'react-redux';
import './Screens.css';

export function ErrorPage(props) {
    const errorMessage = useSelector(selectErrorMessage);
    switch (errorMessage) {
        case 'no-empty-slots':
        case 'no-battery-available':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main py-5'>
                            Oops :(
                            <br />
                            Pas de batteries disponibles.
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
        case 'no-battery-inserted':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main py-5'>
                            Oops :(
                            <br />
                            Aucune batterie insérée.
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
        case 'bms-not-recognized':
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
        default:
            return null;
    }
}