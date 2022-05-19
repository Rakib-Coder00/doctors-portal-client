import React from 'react';
import quote from '../../assets/icons/quote.svg'
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import Review from './Review';

const Testimonial = () => {
    const reviews = [
        {
            _id: 1,
            name: 'John Doe',
            location: 'New York, USA',
            review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit laboriosam, architecto distinctio neque nostrum officiis quibusdam saepe possimus. Magnam, accusantium doloremque! Mollitia, odio.',
            image: people1
        },
        {
            _id: 2,
            name: 'John Doe',
            location: 'New York, USA',
            review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit laboriosam, architecto distinctio neque nostrum officiis quibusdam saepe possimus. Magnam, accusantium doloremque! Mollitia, odio.',
            image: people2
        },
        {
            _id: 3,
            name: 'John Doe',
            location: 'New York, USA',
            review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit laboriosam, architecto distinctio neque nostrum officiis quibusdam saepe possimus. Magnam, accusantium doloremque! Mollitia, odio.',
            image: people3
        },
    ]
    return (
        <section className='my-28'>
            <div className="flex justify-between">
                <div className="">
                    <h4 className="text-xl text-primary font-bold">Testimonial</h4>
                    <h2 className="text-3xl">What our patients say</h2>
                </div>
                <div className="">
                    <img className='w-24 lg:w-48' src={quote} alt="" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map(review => <Review key={review._id} review={review}  />)
                }
            </div>
        </section>
    );
};

export default Testimonial;