import PageBanner from "../Layouts/PageBanner";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';

const ContactUs = () => {

    const [yourName, setYourName] = useState("");
    const [yourEmail, setYourEmail] = useState("");
    const [yourMessage, setYourMessage] = useState("");

    const contactSubmit = (e) => {
        e.preventDefault();

        console.log(yourEmail, yourMessage, yourName)
    }

    return(
        <main className="w-full sm:mt-0">

            {/* Page banner */}
            <PageBanner title={"Contact"} />

            {/* contact form */}
            <div className="py-16 sm:w-11/12 m-auto px-4 w-full relative z-10">
                <h2 className="text-3xl font-semibold text-center">Contact Details</h2>

                <form onSubmit={contactSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-auto mt-10">

                    <div className="flex gap-6">
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

                                
                    <button type="submit" className="bg-primary-green w-full sm:w-1/5 my-6 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-full uppercase outline-none mx-auto hover:bg-black">Submit</button>
                </form>
            </div>

            {/* contact details */}
            <div className="py-16 sm:w-11/12 m-auto px-4 w-full relative z-10">
                <div className="flex flex-col md:flex-row w-full sm:w-3/4 mx-auto">
                    <div className="w-1/3 flex items-center gap-3 justify-center">
                        <PlaceOutlinedIcon />
                        <div className="text-black text-md">
                            <h4 className="font-semibold">Office Address</h4>
                            <p>Zirakpur, 140603, Punjab, India</p>
                        </div>
                    </div>

                    <div className="w-1/3 flex items-center gap-3 justify-center">
                        <EmailOutlinedIcon />
                        <div className="text-black text-md">
                            <h4 className="font-semibold">Email Address</h4>
                            <a className="hover:underline" href="mailto:test@gmail.com">test@gmail.com</a>
                        </div>
                    </div>

                    <div className="w-1/3 flex items-center gap-3 justify-center">
                        <PhoneInTalkOutlinedIcon />
                        <div className="text-black text-md">
                            <h4 className="font-semibold">Phone Number</h4>
                            <a className="hover:underline" href="tel:18002029898">1800 202 9898</a>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}

export default ContactUs;