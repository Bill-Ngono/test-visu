import './Screens.css';

import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import pathIcon from '../Images/Path.png';
import image from '../Images/miskina.png';

export function StationReboot(props) {    

    return (
        <ScreenBox >
            <MessageBox color="Orange">
                <div className='d-flex justify-content-center'>
                    <img className='mx-3' src={pathIcon} alt="Reboot" />
                </div>
                <p className='message-main d-flex align-items-center title_large'>
                    <p className='my-0'>
                        redémarrage 
                        <br></br>
                        en cours
                    </p>
                </p>
                <p className='p-5 mt-5 message-bubble blue_txt'>
                    <p className="bordred_txt">
                        La station est en cours de redémarrage
                    </p>
                    <br></br>
                    <p className="bordred_txt">
                        <strong>
                            L'opération sera terminée dans moins que d'une minute
                        </strong>
                    </p>
                    <br></br>
                    <p className="bordred_txt">
                        Vous pourrez ensuite échanger votre batterie !
                    </p>
                </p>
                <p className='message-alt mt-5 reboottxt'>
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
}