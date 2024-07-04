import MetaData from "../Layouts/MetaData"
import PageBanner from "../Layouts/PageBanner"

const TermsOfUse = () => {
    return (
        <>
            <MetaData title="Terms & Conditions | Fresh Organic Grocery" />

            <main className="w-full sm:mt-0">
                
                <PageBanner title={"Terms & Conditions"} colored={true} />

                <div className="py-8 lg:py-16 sm:w-11/12 xl:w-8/12 m-auto px-4 w-full relative z-10 text-md">

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">1. Introduction</h3>
                        <p className='pt-5'>Welcome to Fresh Organic Grocery. By using our website and purchasing products from us, you agree to be bound by the following terms and conditions. Please read them carefully.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">2. Definitions</h3>
                        <p className='pt-5'>"Website" refers to <a href="http://freshorganicgrocery.com/" className="text-primary-green font-semibold">http://freshorganicgrocery.com/</a>.</p>
                        <p className='pt-3'>"We", "us", and "our" refer to Fresh Organic Grocery.</p>
                        <p className='pt-3'>"User" refers to any individual or entity using our website.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">3. Use of the Website</h3>
                        <p className='pt-5'>By accessing the website, you confirm that you are at least 18 years old or accessing the site under the supervision of a parent or legal guardian.</p>
                        <p className='pt-3'>You agree to use the website for lawful purposes only.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">4. Account Registration</h3>
                        <p className='pt-5'>To access certain services, you may be required to create an account. You agree to provide accurate, current, and complete information.</p>
                        <p className='pt-3'>You are responsible for maintaining the confidentiality of your account and password.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">5. Orders and Payment</h3>
                        <p className='pt-5'>All orders are subject to acceptance and availability.</p>
                        <p className='pt-3'>Prices for products are subject to change without notice.</p>
                        <p className='pt-3'>Payment can be made via Credit card & Cash on delivery.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">6. Shipping and Delivery</h3>
                        <p className='pt-5'>We aim to dispatch all orders within 5 working days. Delivery times may vary based on location and other factors.</p>
                        <p className='pt-3'>Shipping costs are calculated at checkout and depend on the delivery location and chosen shipping method.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">7. Returns and Refunds</h3>
                        <p className='pt-5'>We accept returns within 5 days of receipt of your order, provided that the product is unused and in its original packaging.</p>
                        <p className='pt-3'>Refunds will be processed within 2 days of receiving the returned item.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">8. Intellectual Property</h3>
                        <p className='pt-5'>All content on the website, including but not limited to text, graphics, logos, and images, is the property of Fresh Organic Grocery and protected by copyright laws.</p>
                        <p className='pt-3'>You may not use, reproduce, or distribute any content without our prior written consent.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">9. Limitation of Liability</h3>
                        <p className='pt-5'>To the fullest extent permitted by law, Fresh Organic Grocery shall not be liable for any indirect, incidental, or consequential damages arising from the use of or inability to use the website.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">10. Privacy Policy</h3>
                        <p className='pt-5'>We value your privacy and are committed to protecting your personal information. Please refer to our <a href="/privacy-policy" className="text-primary-green font-semibold">Privacy Policy</a> for more details.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">11. Governing Law</h3>
                        <p className='pt-5'>These terms and conditions are governed by and construed in accordance with the laws.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">12. Changes to Terms and Conditions</h3>
                        <p className='pt-5'>We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">13. Contact Information</h3>
                        <p className='pt-5'>If you have any questions or concerns about these terms and conditions, please contact us at <a href='mailto:info@freshorganicgrocery.com' className='text-primary-green font-semibold'>info@freshorganicgrocery.com</a> or <a className="text-primary-green font-semibold" href="tel:+919915841204">+91 9915841204</a>.</p>
                    </div>

                </div>

            </main>

        </>
    )
}

export default TermsOfUse