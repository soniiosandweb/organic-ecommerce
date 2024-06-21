
const PriceSidebar = ({ cartItems }) => {
    return (
        <div className="flex flex-col md:w-4/12 md:px-1">

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-gray-100 rounded-sm border border-gray-300 sticky top-24 ">
                <h1 className="px-6 py-3 border-b text-xl border-gray-300 font-semibold text-black">Cart Totals</h1>

                <div className="flex flex-col gap-4 p-6 pb-3 font-medium">
                    <p className="flex justify-between">Price ({cartItems.length} item)
                        <span>₹{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice !== 0 ? item.cuttedPrice : item.price) * item.quantity), 0).toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between">Discount <span className="text-primary-green">₹{cartItems.reduce((sum, item) => sum + (((item.cuttedPrice !== 0 ? item.cuttedPrice : item.price) * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()}</span></p>
                    <p className="flex justify-between">Delivery Charges <span className="text-primary-green">FREE</span></p>

                    <div className="border border-dashed border-gray-300"></div>
                    <p className="flex justify-between text-lg font-semibold">Total Amount <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span></p>
                    <div className="border border-dashed border-gray-300"></div>

                    <p className="font-semibold text-primary-green">You will save ₹{cartItems.reduce((sum, item) => sum + (((item.cuttedPrice !== 0 ? item.cuttedPrice : item.price) * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()} on this order</p>

                </div>

            </div>
            {/* <!-- nav tiles --> */}

        </div>
    );
};

export default PriceSidebar;
