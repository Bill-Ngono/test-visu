import { useDispatch, useSelector } from 'react-redux';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import { selectErrorMessage, waitForSwap } from '../features/goToPage';
import './Screens.css';

import image from '../Images/miskina.png';
import warningImg from '../Images/warning.png';

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
                        <p className='message-main d-flex align-items-center'>
                            <img className='mx-3' src={warningImg} alt="warning alert" />
                            <p className='my-0'>
                                Oops :(
                                <br />
                                Pas de batteries disponibles.
                            </p>
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
                                backgroundPosition: 'right ',
                            }
                        } className="w-100 h-100"/>
                    </GraphicsBox>
                </ScreenBox>
            )
        case 'no-battery-inserted':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main d-flex align-items-center'>
                            <img className='mx-3' src={warningImg} alt="warning alert" />
                            <p className='my-0'>
                                Oops :(
                                <br />
                                Aucune batterie insérée.
                            </p>
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
                                backgroundPosition: 'right ',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
                </ScreenBox>
            )
        case 'bms-not-recognized':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main d-flex align-items-center'>
                            <img className='mx-3' src={warningImg} alt="warning alert" />
                            <p className='my-0'>
                                Oops :(
                                <br />
                                Erreur de détection.
                            </p>
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
                                backgroundPosition: 'right ',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
                </ScreenBox>
            )
        case 'no-battery-collected':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main d-flex align-items-center'>
                            <img className='mx-3' src={warningImg} alt="warning alert" />
                            <p className='my-0'>
                                Oops :(
                                <br />
                                Erreur de détection.
                            </p>
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
                                backgroundPosition: 'right ',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
                </ScreenBox>
            )
        case 'station-reboot':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">
                        <p className='message-main d-flex align-items-center'>
                            {/* <img className='mx-3' src={warningImg} alt="warning alert" /> */}
                            <p className='my-0'>
                                redémarrage 
                                <br></br>
                                en cours
                            </p>
                        </p>
                        <p className='py-5 message-bubble'>
                            La station est en cours de redémarrage
                            <br></br>
                            L'opération sera terminée dans moins que d'une minute
                            <br></br>
                            Vous pourrez ensuite échanger votre batterie !
                        </p>
                        <p className='message-alt'>
                            <strong>
                                merci pour votre patience
                            </strong>
                        </p>
                    </MessageBox>
                    <GraphicsBox>
                        <div style={
                            {
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'right ',
                            }
                        } className="w-100 h-100" />
                    </GraphicsBox>
                </ScreenBox>
            )
        default:
            return null;
    }
}