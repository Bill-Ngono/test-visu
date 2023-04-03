import './Screens.css';

import { useDispatch } from 'react-redux';
import { waitForSwap } from '../features/stepReducer';
import charging from '../Images/charging.png';

import bss_available_img from '../Images/station_available.png';
import location_pin_img from '../Images/location_pin.png';


import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import store from '../utils/store';

export function ChargingStation(props) {    

    return (
        <ScreenBox >
            <MessageBox color="Orange">

                <div className='flex text-center mt-5'>
                    <img className='illustration mb-5' src={charging} alt="charging alert" />
                    <p className='message-main-new align-self-center'>
                        <span className='fs-1'>
                            BATTERIES EN CHARGE
                        </span>
                    </p>
                    <p className='message-alt-new mb-4 text-uppercase'>
                        Cette station n'a plus de batterie <br/> chargée disponible pour le moment
                    </p>
                </div>

                <div className='message-bubble-holder-new mx-auto'>
                    <p className='suggestion-new text-uppercase'>
                        Consultez l'app pour voir <span className='fw-bold'>Le nombre de batteries chargées en temps réel</span> 
                    </p>
                    <p className='suggestion-new fw-bold text-uppercase'>
                        
                    </p>
                </div>
                
            </MessageBox>
            <GraphicsBox>
                <div className='flex flex-col text-center'>
                    <div className='example-text-new'>
                        <img className='example-img-new' src={location_pin_img} alt="charging alert" />
                        <span className='align-self-start mt-0'>
                            Nombre de <span className='fw-bold'>batteries chargées</span>
                        </span> 
                    </div>
                    <img className='illustration-r ' src={bss_available_img} alt="new sations" />
                </div>
            </GraphicsBox>
        </ScreenBox>
    )
}