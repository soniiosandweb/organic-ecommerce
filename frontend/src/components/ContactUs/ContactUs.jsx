import PageBanner from "../Layouts/PageBanner";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import { useDispatch, useSelector } from "react-redux";
import { contactFormData } from "../../actions/contactAction";
import { useSnackbar } from 'notistack';
import MetaData from "../Layouts/MetaData";

const ContactUs = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [yourName, setYourName] = useState("");
    const [yourEmail, setYourEmail] = useState("");
    const [yourMessage, setYourMessage] = useState("");

    const {contact, error} = useSelector((state) => state.contactForm)

    const contactSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: yourName,
            email: yourEmail,
            message: yourMessage,
        }

        dispatch(contactFormData(data));

    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        }
        if(contact){
            enqueueSnackbar(contact.message, { variant: "success" });
            setYourEmail("");
            setYourMessage("");
            setYourName("");
        }
    }, [dispatch, contact, error, enqueueSnackbar])

    return(
        <>
            <MetaData title="Contact Us | Fresh Organic Grocery" />
            
            <main className="w-full sm:mt-0">

                {/* Page banner */}
                <PageBanner title={"Contact"} colored={false} />

                {/* contact form */}
                <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full relative z-10">
                    <h2 className="text-xl sm:text-3xl font-semibold text-center">Contact Details</h2>

                    <form onSubmit={contactSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full lg:w-3/4 mx-auto mt-10">

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                            <TextField
                                value={yourName}
                                onChange={(e) => setYourName(e.target.value)}
                                type="text"
                                label="Your Name"
                                fullWidth
                                variant="outlined"
                                required
                            />

                            <TextField
                                value={yourEmail}
                                onChange={(e) => setYourEmail(e.target.value)}
                                type="email"
                                label="Your Email"
                                fullWidth
                                variant="outlined"
                                required
                            />
                        </div>

                        <TextField
                            value={yourMessage}
                            onChange={(e) => setYourMessage(e.target.value)}
                            fullWidth
                            label="Type your message"
                            variant="outlined"
                            required
                            multiline
                            rows={8}
                        />

                                    
                        <button type="submit" className="w-full sm:w-1/5 my-6 mx-auto bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black">Submit</button>
                    </form>
                </div>

                {/* contact details */}
                <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full relative z-10">
                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-3/4 mx-auto">
                        <div className="w-full md:w-1/3 flex items-start gap-3 justify-start md:justify-center">
                            <PlaceOutlinedIcon />
                            <div className="text-black text-md">
                                <h4 className="font-semibold">Office Address</h4>
                                <p className="text-sm">SCO 30, First Floor, Near Devaji Plaza, VIP Road, Zirakpur, PB (India).</p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 flex items-start gap-3 justify-start md:justify-center">
                            <EmailOutlinedIcon />
                            <div className="text-black text-md">
                                <h4 className="font-semibold">Email Address</h4>
                                <a className="hover:underline text-sm" href="mailto:info@freshorganicgrocery.com">info@freshorganicgrocery.com</a>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 flex items-start gap-3 justify-start md:justify-center">
                            <PhoneInTalkOutlinedIcon />
                            <div className="text-black text-md">
                                <h4 className="font-semibold">Phone Number</h4>
                                <a className="hover:underline text-sm" href="tel:+919915841204">+91 9915841204</a>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
}

export default ContactUs;