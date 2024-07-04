import MetaData from "../Layouts/MetaData"
import PageBanner from "../Layouts/PageBanner"

const ShippingPolicy = () => {
    return(
        <>
            <MetaData title={"Shipping Policy | Fresh Organic Grocery"} />

            <main className="w-full sm:mt-0">
                <PageBanner title={"Shipping Policy"} colored={true} />

                <div className="py-8 lg:py-16 sm:w-11/12 xl:w-8/12 m-auto px-4 w-full relative z-10 text-md">
                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">1. Shipping Methods & Delivery Times</h3>
                        <p className='pt-5'><span className='font-semibold'>1.1 Shipping Methods:</span></p>
                        <p className='pt-3'>We offer various shipping options to meet your needs:</p>
                        <ul className='list-disc list-inside'>
                            <li>Standard Shipping</li>
                            <li>Expedited Shipping</li>
                            <li>Overnight Shipping</li>
                            <li>International Shipping</li>
                        </ul>

                        <p className='pt-5'><span className='font-semibold'>1.2 Delivery Times:</span></p>
                        <p className='pt-3'>Delivery times vary based on the shipping method selected at checkout and the destination:</p>
                        <ul className='list-disc list-inside'>
                            <li>Standard Shipping: 5-7 business days</li>
                            <li>Expedited Shipping: 2-3 business days</li>
                            <li>Overnight Shipping: 1 business day</li>
                            <li>International Shipping: 7-21 business days (may vary depending on customs processing times)</li>
                        </ul>

                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">2. Shipping Rates</h3>
                        <p className='pt-5'>Shipping rates are calculated based on the weight of the package, shipping method selected, and destination.</p>
                        <p className='pt-3'>Shipping charges will be displayed at checkout before you finalize your order.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">3. Order Processing</h3>
                        <p className='pt-5'>Orders are processed and shipped within 1-2 business days (Monday-Friday, excluding holidays).</p>
                        <p className='pt-3'>You will receive a confirmation email with tracking information once your order has been shipped.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">4. International Shipping</h3>
                        <p className='pt-5'><span className='font-semibold'>4.1 Customs, Duties, and Taxes:</span></p>
                        <p className='pt-3'>International shipments may be subject to import taxes, duties, and customs fees, which are the responsibility of the recipient.</p>
                        <p className='pt-3'>These charges are not included in the item price or shipping cost and may be collected upon delivery.</p>

                        <p className='pt-5'><span className='font-semibold'>4.2 Restrictions:</span></p>
                        <p className='pt-3'>Certain products may be restricted or prohibited in some countries. It is the customer's responsibility to check local regulations before placing an order.</p>
                        <p className='pt-3'>We are not responsible for any delays or issues caused by customs.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">5. Shipping Address</h3>
                        <p className='pt-5'>Please ensure that your shipping address is complete and accurate.</p>
                        <p className='pt-3'>We are not responsible for orders shipped to incorrect or incomplete addresses provided by the customer.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">6. Delivery Issues</h3>
                        <p className='pt-5'><span className='font-semibold'>6.1 Lost or Stolen Packages:</span></p>
                        <p className='pt-3'>If your tracking information shows that your package was delivered but you have not received it, please contact our customer service team for assistance.</p>
                        <p className='pt-3'>We are not responsible for lost or stolen packages confirmed to be delivered to the address provided during checkout.</p>

                        <p className='pt-5'><span className='font-semibold'>6.2 Damaged Packages:</span></p>
                        <p className='pt-3'>If your package arrives damaged, please contact our customer service team immediately with your order number and photos of the damaged item and packaging.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">7. Changes to Shipping Policy</h3>
                        <p className='pt-5'>We reserve the right to update or modify this Shipping Policy at any time without prior notice.</p>
                        <p className='pt-3'>Changes will be effective immediately upon posting on our website.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">8. Contact Information</h3>
                        <p className='pt-5'>For any questions or concerns about our Shipping Policy, please contact us at:</p>
                        <p className='pt-3'><span className='font-semibold'>Email:</span> <a href='mailto:info@freshorganicgrocery.com' className='text-primary-green font-semibold'>info@freshorganicgrocery.com</a></p>
                        <p className='pt-3'><span className='font-semibold'>Phone:</span> <a className="text-primary-green font-semibold" href="tel:+919915841204">+91 9915841204</a></p>
                        <p className='pt-3'><span className='font-semibold'>Address:</span> SCO 30, First Floor, Near Devaji Plaza, VIP Road, Zirakpur, PB (India).</p>
                    </div>

                </div>

            </main>
        </>
    )
}

export default ShippingPolicy