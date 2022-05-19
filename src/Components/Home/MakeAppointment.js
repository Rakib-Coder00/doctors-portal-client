import React from 'react';
import doctor from '../../assets/images/doctor-small.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryBtn from '../Navbar/PrimaryBtn';

const MakeAppointment = () => {

    return (
        <section style={{background: `url(${appointment})`}} className='flex justify-center items-center'>
            <div className="flex-1 hidden lg:block">
                <img className='mt-[-100px]' src={doctor} alt="" />
            </div>
            <div className="flex-1 px-5">
                <h3 className='text-xl text-primary font-bold'>Appointment</h3>
                <h2 className='text-3xl text-white py-5'>Make an Appointment Today</h2>
                <p className="text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit laboriosam, architecto distinctio neque nostrum officiis quibusdam saepe possimus. Magnam, accusantium doloremque! Mollitia, odio.</p>
                <PrimaryBtn>Get Started</PrimaryBtn>
            </div>
        </section>
    );
};

export default MakeAppointment;