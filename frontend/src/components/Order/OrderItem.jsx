import { LazyLoadImage } from 'react-lazy-load-image-component';

const OrderItem = (props) => {

    const { name, image, price, quantity } = props;

    return (
        <div className="flex flex-row px-0 py-2 items-start ">
            {/* <!-- image container --> */}
            <div className="w-32 h-20 mr-2">
                <LazyLoadImage 
                    className="h-full w-full object-contain" src={image} alt={name}
                />
            </div>
            {/* <!-- image container --> */}

            {/* <!-- order desc container --> */}
            <div className="flex flex-col sm:flex-row justify-between w-full">

                <div className="flex flex-col gap-1 overflow-hidden">
                    <p className="text-md font-medium">{name.length > 40 ? `${name.substring(0, 40)}...` : name}</p>
                    <p className="text-sm mt-2">Quantity: {quantity}</p>
                    <p className="text-sm ">Price: ₹{(quantity * price).toLocaleString()}</p>
                </div>

            </div>
            {/* <!-- order desc container --> */}

        </div>
    );
};

export default OrderItem;
