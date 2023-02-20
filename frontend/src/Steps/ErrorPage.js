import { useDispatch, useSelector } from 'react-redux';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import { selectErrorMessage, waitForSwap } from '../features/goToPage';
import './Screens.css';

import image from '../Images/miskina.jpg';

export function ErrorPage(props) {
    const dispatch = useDispatch();
    setTimeout(() => { 
        dispatch(waitForSwap())
    }, 10000);
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
                        <p className='message-alt'>
                            Réessayez l'opération.
                        </p>
                    </MessageBox>
                    <GraphicsBox>
                        <div style={
                            {
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom 0% right 30%',
                            }
                        } className="w-100 h-100"/>
                    </GraphicsBox>
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
                        <p className='message-alt'>
                            Réessayez l'opération.
                        </p>
                    </MessageBox>
                    <GraphicsBox>
                        <div style={
                            {
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom 0% right 30%',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
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
                        <p className='message-alt'>
                            Réessayez l'opération.
                        </p>
                    </MessageBox>
                    <GraphicsBox>
                        <div style={
                            {
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom 0% right 30%',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
                </ScreenBox>
            )
        case 'no-battery-collected':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main py-5'>
                            Oops :(
                            <br />
                            Erreur de détection.
                        </p>
                        <p className='py-5 message-bubble'>
                            Aie, vous n'avez pas retiré votre batterie !
                        </p>
                        <p className='message-alt'>
                            Réessayez l'opération.
                        </p>
                    </MessageBox>
                    <GraphicsBox>
                        <div style={
                            {
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom 0% right 30%',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
                </ScreenBox>
            )
        default:
            return null;
    }
}