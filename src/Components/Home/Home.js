import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Footer from './Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Info/> 
            <Services/>
            <MakeAppointment/>
            <Testimonial/>
            <Contact/>
            <Footer/>
        </div>
    );
};

export default Home;