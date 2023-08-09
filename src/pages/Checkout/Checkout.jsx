import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Checkout = () => {

    const service = useLoaderData();
    const { title, price, _id } = service;

    const { user } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email?.value;
        const date = form.date.value;
        const due = form.due.value;

        const order = {
            customerName: name,
            email,
            date,
            due,
            service: _id
        }

        console.log(order);
    }

    return (
        <div>
            <h2 className="text-5xl font-bold text-center">Book Our {title} Service</h2>

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
                        <input type="date" name="date" className="input input-bordered" />
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