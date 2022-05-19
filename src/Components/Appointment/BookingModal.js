import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../Firebase/Firebase.init';
import { toast } from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
    const { _id, name, slots } = treatment;
    const [user] = useAuthState(auth)
    const formattedDate = format(date, 'PP');

    const handleBooking = (e) => {
        e.preventDefault();
        const slot = e.target.slot.value
        // console.log(slot);
        const booking = {
            treatmentId: _id,
            treatment: name,
            slot,
            date: formattedDate,
            patient: user.email,
            patientName: user.displayName,
            phone: e.target.phone.value
        }
        fetch('https://ancient-savannah-56853.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    toast.success(`Booking Successful, ${formattedDate}  at ${slot}`)
                }
                else {
                    toast.error(`Booking Failed, ${data.booking?.date}  at ${data.booking?.slot}`)
                }
                refetch()
                // to close modal ==>
                setTreatment(null)
            })
    }
    return (
        <div>

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Booking for: {name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-3'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">

                            {slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
                        </select>
                        <input type="text" name='name' disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="number" name='phone' placeholder="Contact Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div >
    );
};

export default BookingModal;