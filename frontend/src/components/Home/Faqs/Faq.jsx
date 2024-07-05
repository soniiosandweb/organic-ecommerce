import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaqs } from '../../../actions/faqAction';

const Faq = () => {

    const dispatch = useDispatch();

    const {faqs, loading} = useSelector((state) => state.allFaqs);

    const [expanded, setExpanded] = useState("panel0");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(()=>{
        dispatch(getAllFaqs());
    }, [dispatch])

    return(
        <section className="bg-white w-full overflow-hidden faq-section relative" id="faq">
            <div className="py-8 lg:py-16 sm:w-11/12 xl:w-8/12 m-auto px-4 w-full flex flex-col">
                <h2 className="text-3xl font-semibold text-center mb-10 md:mb-14 mt-6">
                    <span className='text-primary-green'>~ </span> Frequently Asked Questions <span className='text-primary-green'>~ </span>
                </h2>
                {!loading && faqs?.map((faq, index) => (
                    <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)} key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}bh-content`}
                            id={`panel${index}bh-header`}
                        >
                            <h6 className='font-semibold'>{faq.title}</h6>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className=''>{faq.description}</p>
                        </AccordionDetails>
                    </Accordion>
                ))}
                
            </div>
        </section>
    )
}
export default Faq