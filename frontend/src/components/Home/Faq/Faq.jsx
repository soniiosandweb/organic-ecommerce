import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import './style.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import faqBg from '../../../assets/images/faq-bg.png';

const Faq = () => {

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return(
        <section className="bg-white w-full overflow-hidden faq-section relative">
            <div className="py-8 lg:py-16 sm:w-11/12 lg:w-8/12 m-auto px-4 w-full flex flex-col relative z-10">
                <h2 className="text-3xl font-semibold text-center mb-10 md:mb-14 mt-6">Frequently Asked Questions</h2>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <h6 className='font-bold'>When Do I Receive My Order?</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className=''>When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <h6 className='font-bold'>I Now See The Longer Delivery Time Of (A Part Of) My Order. How Can I Cancel It?</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className=''>If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <h6 className='font-bold'>When Will I Receive The Invoice For My Order?</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className=''>When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <h6 className='font-bold'>How Long Will My Order Take To Be Delivered?</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut pretium libero, non viverra nisl. Maecenas rhoncus erat eget vehicula tempor. Mauris sollicitudin, tellus nec feugiat elementum, ante sapien sagittis sapien, non convallis velit orci quis nisi. In egestas, mauris sit amet pellentesque sollicitudin</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5bh-content"
                        id="panel5bh-header"
                    >
                        <h6 className='font-bold'>Do I Need To Create An Account To Place An Order?</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className=''>Vestibulum in risus dui. Donec malesuada fringilla dui, sed porttitor lacus venenatis vel. Integer laoreet lacus ut lacus condimentum aliquet. Pellentesque placerat cursus eleifend. Donec sed facilisis felis. Praesent lacinia non leo non tristique. Proin interdum risus nec tincidunt interdum.</p>
                    </AccordionDetails>
                </Accordion>
            </div>

            <LazyLoadImage 
                src={faqBg}
                alt="faq-background"
                className="w-full object-cover object-top absolute top-0 h-full"
            />
        </section>
    )
}
export default Faq