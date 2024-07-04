import MetaData from "../Layouts/MetaData"
import PageBanner from "../Layouts/PageBanner"

const CancellationReturn = () => {
    return(
        <>
            <MetaData title={"Cancellation & Returns Policy"} />

            <main className="w-full sm:mt-0">

                <PageBanner title={"Cancellation & Returns Policy"} colored={true} />

                <div className="py-8 lg:py-16 sm:w-11/12 xl:w-8/12 m-auto px-4 w-full relative z-10 text-md">
                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">1. Cancellation Policy</h3>
                        <p className='pt-5'><span className='font-semibold'>1.1 Order Cancellation by Customer:</span></p>
                        <p className='pt-3'><u>Before Shipment:</u></p>
                        <ul className='list-disc list-inside'>
                            <li>Customers can cancel their order before it is shipped by contacting our customer service team.</li>
                            <li>A full refund will be issued to the original payment method within 5-7 business days.</li>
                        </ul>

                        <p className='pt-3'><u>After Shipment:</u></p>
                        <p className='pt-3'>Once the order has been shipped, it cannot be canceled. Customers will need to follow the return process to return the product.</p>

                        <p className='pt-5'><span className='font-semibold'>1.2 Order Cancellation by Us:</span></p>
                        <p className='pt-3'>We reserve the right to cancel orders for any reason, including but not limited to:</p>
                        <ul className='list-disc list-inside'>
                            <li>Out of stock items</li>
                            <li>Payment issues</li>
                            <li>Suspected fraudulent activity</li>
                            <li>Errors in product information or pricing</li>
                        </ul>

                        <p className='pt-3'>If we cancel an order, a full refund will be issued to the original payment method within 5-7 business days.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">2. Returns Policy</h3>
                        <p className='pt-5'><span className='font-semibold'>2.1 Eligibility for Returns:</span></p>
                        <ul className='list-disc list-inside'>
                            <li>Products can be returned within 30 days of delivery.</li>
                            <li>To be eligible for a return, the item must be unused, in the same condition that you received it, and in its original packaging.</li>
                            <li>Some items are non-returnable, including perishable goods, custom products, and intimate items for hygiene reasons.</li>
                        </ul>

                        <p className='pt-5'><span className='font-semibold'>2.2 Return Process:</span></p>
                        <p className='pt-3'>To initiate a return, please contact our customer service team with your order number and reason for return.</p>
                        <p className='pt-3'>Once your return is approved, you will receive instructions on how to send the item back to us.</p>

                        <p className='pt-5'><span className='font-semibold'>2.3 Refunds:</span></p>
                        <p className='pt-3'>Once we receive your return, we will inspect the item and notify you of the approval or rejection of your refund.</p>
                        <p className='pt-3'>If approved, a refund will be processed, and a credit will be applied to your original payment method within 5-7 business days.</p>

                        <p className='pt-5'><span className='font-semibold'>2.4 Return Shipping:</span></p>
                        <p className='pt-3'>Customers are responsible for paying return shipping costs unless the return is due to our error (e.g., incorrect or defective item).</p>
                        <p className='pt-3'>We recommend using a trackable shipping service or purchasing shipping insurance. We cannot guarantee that we will receive your returned item.</p>

                        <p className='pt-5'><span className='font-semibold'>2.5 Exchanges:</span></p>
                        <p className='pt-3'>We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact our customer service team for further instructions.</p>

                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">3. Contact Information</h3>
                        <p className='pt-5'>For any questions or concerns about our Cancellation & Returns Policy, please contact us at:</p>
                        <p className='pt-3'><span className='font-semibold'>Email:</span> <a href='mailto:info@freshorganicgrocery.com' className='text-primary-green font-semibold'>info@freshorganicgrocery.com</a></p>
                        <p className='pt-3'><span className='font-semibold'>Phone:</span> <a className="text-primary-green font-semibold" href="tel:+919915841204">+91 9915841204</a></p>
                        <p className='pt-3'><span className='font-semibold'>Address:</span> SCO 30, First Floor, Near Devaji Plaza, VIP Road, Zirakpur, PB (India).</p>
                    </div>

                </div>

            </main>
        </>
    )
}

export default CancellationReturn