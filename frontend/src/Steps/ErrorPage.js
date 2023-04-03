import { useDispatch, useSelector } from 'react-redux';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import { selectErrorMessage } from '../utils/selectors';
import { waitForSwap } from '../features/stepReducer';
import './Screens.css';

import image from '../Images/miskina.png';
import warningImg from '../Images/warning.png';
import warningIcn from '../Images/decline.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import store from '../utils/store';

export function ErrorPage(props) {

    const dispatch = useDispatch()

    const backTime = window.setTimeout(() => {
        const currentStep = store.getState().steps.step
        if (currentStep === 'error-page' ) {
            dispatch(waitForSwap())
        }
    }, 8000);

    const errorMessage = useSelector(selectErrorMessage());

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
                        {errorMessage}
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
}