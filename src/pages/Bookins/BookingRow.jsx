import { space } from 'postcss/lib/list';
import React from 'react';

const BookingRow = ({ booking, handleDelete, handleBookingConfirm }) => {

    const { customerName, due, service_title, img, date, _id, status } = booking;

    return (

        <tbody>
            {/* row 1 */}
            <tr>
                <th>
                    <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-24 h-24">
                                {
                                    img ? <img src={img} alt="Avatar Tailwind CSS Component" /> : ''
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{service_title}</div>
                            <div className="text-sm opacity-50">{customerName}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span className="badge badge-ghost badge-sm">{date}</span>
                </td>
                <td>{due}</td>
                <th>
                    {
                        status === 'confirm' ? <button className='btn btn-xs btn-success'>Confirmed</button> :
                            <button onClick={() => handleBookingConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>}
                </th>
            </tr>
        </tbody>
    );
};

export default BookingRow;