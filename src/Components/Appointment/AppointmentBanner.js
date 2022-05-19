import React from 'react';
import chair from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns/esm';

const AppointmentBanner = ({date, setDate}) => {
    // const [date, setDate] = useState(new Date());
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt='img' />
                <div className=''>
                    <DayPicker mode="single"
                        selected={date}
                        onSelect={setDate} />
            <p>{format(date,'PP')}</p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;