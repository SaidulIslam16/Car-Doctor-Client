import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Checkout = () => {

    const service = useLoaderData();
    const { title, price, _id, img } = service;

    const { user } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email?.value;
        const date = form.date.value;
        const due = form.due.value;

        const booking = {
            customerName: name,
            email,
            date,
            due,
            img,
            service_id: _id,
            service_title: title
        }

        console.log(booking);

        fetch('https://car-doctor-server-iota-livid.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    alert('booking confirmed')
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl font-bold text-center">Book Our <span className="text-red-500">{title}</span> Service</h2>

            {/* form */}
            <form onSubmit={handleBookService} className="w-2/3 mx-auto my-12">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} placeholder="Enter your Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" required name="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amoutn</span>
                        </label>
                        <input type="text" name="due" defaultValue={'$' + price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Confirm booking" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;