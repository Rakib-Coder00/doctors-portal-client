import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';
import { useQuery } from 'react-query'
import Spinner from './../Shared/Spinner';


const AvailableAppointment = ({ date }) => {
    // const [services, setServices] = useState([])
    const [treatment, setTreatment] = useState(null)
    const formattedDate = format(date, 'PP');
    const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => fetch(`https://ancient-savannah-56853.herokuapp.com/available?date=${formattedDate}`)
        .then(res => res.json())
    )

    if (isLoading) {
        return <Spinner />
    }
    // useEffect(() => {
    //   fetch(`https://ancient-savannah-56853.herokuapp.com/available?date=${formattedDate}`)
    //     .then(res => res.json())
    //     .then(data => setServices(data))

    // }, [formattedDate])

    return (
        <div>
            <h4 className='text-xl text-center text-secondary'>Available Appointment on : {format(date, 'PP')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services?.map(service => (
                    <Service key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    />))}
            </div>
            {treatment && <BookingModal date={date} treatment={treatment} setTreatment={setTreatment} refetch={refetch} />}
        </div>
    );
};

export default AvailableAppointment;