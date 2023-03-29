import { useDispatch, useSelector } from 'react-redux';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import { selectErrorMessage, waitForSwap } from '../features/goToPage';
import './Screens.css';

import image from '../Images/miskina.png';
import warningImg from '../Images/warning.png';
import warningIcn from '../Images/decline.png';
import charging from '../Images/charging.png';
import new_sations_display from '../Images/new_sations_display.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export function ErrorPage(props) {
    const dispatch = useDispatch();
    setTimeout(() => { 
        dispatch(waitForSwap())
    }, 10000);
    const errorMessage = useSelector(selectErrorMessage);
    switch (errorMessage) {
        case 'charging-station':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">

                        <p className='message-main d-flex align-items-center'>
                            <p className='my-0'>
                                <span className='fs-1'>
                                    Station en cours de recharge
                                </span>
                            </p>
                            <img className='mx-3' src={charging} alt="charging alert" />
                        </p>
                        <p className='message-alt text-uppercase'>
                            Pas de batteries disponibles.
                        </p>
                        <div className='message-bubble-holder'>
                            <img className='warning_img' src={warningIcn} alt="warning" />
                            <p className='message-bubble'>
                                Nous tenons à nous excuser pour la gêne occasionnée, mais aucune batterie pleinement chargée n’est disponible dans cette station.
                                <br></br>
                                <br></br>
                                <p className='message-bubble-sub'>
                                    Pensez à consulter l’application mobile qui vous donne le nombre de batteries chargées en temps réel
                                </p>
                            </p>
                        </div>
                    </MessageBox>
                    <GraphicsBox>
                        <img className='' src={new_sations_display} alt="new sations" />
                    </GraphicsBox>
                </ScreenBox>
            )
        case 'no-empty-slots':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">

                        <p className='message-main d-flex align-items-center'>
                            <img className='mx-3' src={warningImg} alt="warning alert" />
                            <p className='my-0'>
                                <span className='fs-1'>
                                    Oops :(
                                </span>
                                <br />
                                <span className='fs-5'>
                                    Pas de batteries disponibles.
                                </span>
                            </p>
                        </p>
                        <div className='message-bubble-holder'>
                            <img className='warning_img' src={warningIcn} alt="warning" />
                            <p className='message-bubble'>
                                Aie, nous n’arrivons pas à lire correctement votre batterie
                            </p>
                        </div>
                        <p className='message-alt'>
                        <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-1 fs-4' /> Réessayez l'opération.
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
        case 'no-battery-available':
            return (
                <ScreenBox >
                    <MessageBox color="Orange">

                        <p className='message-main d-flex align-items-center'>
                            <img className='mx-3' src={warningImg} alt="warning alert" />
                            <p className='my-0'>
                                <span className='fs-1'>
                                    Oops :(
                                </span>
                                <br />
                                <span className='fs-5'>
                                    Pas de batteries disponibles.
                                </span>
                            </p>
                        </p>
                        <div className='message-bubble-holder'>
                            <img className='warning_img' src={warningIcn} alt="warning" />
                            <p className='message-bubble'>
                                Aie, nous n’arrivons pas à lire correctement votre batterie
                            </p>
                        </div>
                        <p className='message-alt'>
                        <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-1 fs-4' /> Réessayez l'opération.
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
                                <span className='fs-1'>
                                    Oops :(
                                </span>
                                <br />
                                Aucune batterie insérée.
                            </p>
                        </p>
                        <div className='message-bubble-holder'>
                            <img className='warning_img' src={warningIcn} alt="warning" />
                            <p className='message-bubble'>
                                Aie, nous n’arrivons pas à lire correctement votre batterie
                            </p>
                        </div>
                        <p className='message-alt'>
                            <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-1 fs-4' /> Réessayez l'opération.
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
                                <span className='fs-1'>
                                    Oops :(
                                </span>
                                <br />
                                Erreur de détection.
                            </p>
                        </p>
                        <div className='message-bubble-holder'>
                            <img className='warning_img' src={warningIcn} alt="warning" />
                            <p className='message-bubble'>
                                Aie, nous n’arrivons pas à lire correctement votre batterie
                            </p>
                        </div>
                        <p className='message-alt'>
                            <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-1 fs-4' /> Réessayez l'opération.
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
                                <span className='fs-1'>
                                    Oops :(
                                </span>
                                <br />
                                Erreur de détection.
                            </p>
                        </p>
                        <div className='message-bubble-holder'>
                            <img className='warning_img' src={warningIcn} alt="warning" />
                            <p className='message-bubble'>
                                Aie, vous n'avez pas retiré votre batterie !
                            </p>
                        </div>
                        <p className='message-alt'>
                        <   FontAwesomeIcon icon={faAngleDoubleRight} className='mx-1 fs-4' /> Réessayez l'opération.
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