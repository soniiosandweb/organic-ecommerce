import MetaData from '../Layouts/MetaData';
import PageBanner from '../Layouts/PageBanner';

const PrivacyPolicy = () => {
    return(
        <>
            <MetaData title="Privacy Policy | Fresh Organic Grocery" />

            <main className="w-full sm:mt-0">

                <PageBanner title={"Privacy Policy"} colored={true} />

                <div className="py-8 lg:py-16 sm:w-11/12 xl:w-8/12 m-auto px-4 w-full relative z-10 text-md">

                    <div className="pt-10 w-full">
                        <h2 className="text-lg font-semibold text-left">Last Updated: 28-06-2024</h2>

                        <p className='pt-8'>Welcome to Fresh Online Grocery. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website and use our services.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">1. Information We Collect</h3>
                        <p className='pt-5'>We may collect the following types of information:</p>
                        <p className='pt-3'><span className='font-semibold'>Personal Information:</span> This includes your name, email address, phone number, shipping address, billing address, and payment information.</p>
                        <p className='pt-3'><span className='font-semibold'>Account Information:</span> When you create an account, we collect your username, password, and other registration details.</p>
                        <p className='pt-3'><span className='font-semibold'>Transaction Information:</span> Details about your purchases, order history, and payment methods.</p>
                        <p className='pt-3'><span className='font-semibold'>Usage Information:</span> Information about how you use our website, including your IP address, browser type, device information, pages visited, and actions taken.</p>
                        <p className='pt-3'><span className='font-semibold'>Cookies and Tracking Technologies:</span> We use cookies and similar technologies to track your activity on our website and collect certain information.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">2. How We Use Your Information</h3>
                        <p className='pt-5'>We use the information we collect for the following purposes:</p>
                        <ul className='list-disc list-inside'>
                            <li>To process and fulfill your orders.</li>
                            <li>To provide and manage your account.</li>
                            <li>To communicate with you about your orders, account, and customer service inquiries.</li>
                            <li>To improve our website, products, and services.</li>
                            <li>To personalize your experience on our website.</li>
                            <li>To send you marketing communications, if you have opted in.</li>
                            <li>To prevent fraudulent transactions and ensure the security of our website.</li>
                        </ul>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">3. Sharing Your Information</h3>
                        <p className='pt-5'>We do not sell your personal information to third parties. However, we may share your information with:</p>
                        <p className='pt-3'><span className='font-semibold'>Service Providers:</span> Third-party vendors that help us operate our website, process payments, and fulfill orders.</p>
                        <p className='pt-3'><span className='font-semibold'>Business Partners:</span> Partners with whom we may collaborate for special offers or joint promotions.</p>
                        <p className='pt-3'><span className='font-semibold'>Legal Requirements:</span> If required by law or in response to legal processes, we may disclose your information to law enforcement or regulatory authorities.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">4. Data Security</h3>
                        <p className='pt-5'>We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data from unauthorized access, use, or disclosure.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">5. Your Rights</h3>
                        <p className='pt-5'>You have the right to:</p>
                        <ul className='list-disc list-inside'>
                            <li>Access and review the personal information we hold about you.</li>
                            <li>Request corrections to any inaccurate or incomplete information.</li>
                            <li>Request the deletion of your personal information, subject to certain legal obligations.</li>
                            <li>Opt out of marketing communications at any time.</li>
                        </ul>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">6. Cookies and Tracking Technologies</h3>
                        <p className='pt-5'>We use cookies to enhance your experience on our website. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of our website.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">7. Changes to This Privacy Policy</h3>
                        <p className='pt-5'>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. We encourage you to review this policy periodically.</p>
                    </div>

                    <div className="pt-10 w-full">
                        <h3 className="text-lg font-semibold text-left">8. Contact Us</h3>
                        <p className='pt-5'>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                        <p className='pt-3'><span className='font-semibold'>Email:</span> <a href='mailto:info@freshorganicgrocery.com' className='text-primary-green font-semibold'>info@freshorganicgrocery.com</a></p>
                        <p className='pt-3'><span className='font-semibold'>Phone:</span> <a className="text-primary-green font-semibold" href="tel:+919915841204">+91 9915841204</a></p>
                        <p className='pt-3'><span className='font-semibold'>Address:</span> SCO 30, First Floor, Near Devaji Plaza, VIP Road, Zirakpur, PB (India).</p>
                    </div>

                </div>

            </main>
        </>
        
    )
}

export default PrivacyPolicy