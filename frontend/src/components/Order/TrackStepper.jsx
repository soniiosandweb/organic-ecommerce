import { Step, StepLabel, Stepper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDate } from '../../utils/functions';

const TrackStepper = ({ activeStep, orderOn, shippedAt, deliveredAt }) => {

    const steps = [
        {
            status: "Ordered",
            dt: formatDate(orderOn),
        },
        {
            status: "Shipped",
            dt: formatDate(shippedAt),
        },
        {
            status: "Delivered",
            dt: formatDate(deliveredAt),
        },
    ];

    const completedIcon = <span className="text-primary-green animate-pulse"><CircleIcon sx={{ fontSize: "16px" }} /></span>;
    const pendingIcon = <span className="text-black"><CircleIcon sx={{ fontSize: "16px" }} /></span>;

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((item, index) => (
                <Step
                    key={index}
                    active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                >
                    <StepLabel
                        icon={
                            activeStep >= index ? completedIcon : pendingIcon
                        }
                    >
                        {activeStep >= index ? (
                            <div className="flex flex-col text-md">
                                <span className="text-primary-green font-semibold">{item.status}</span>
                                {item.dt !== "Invalid Date" && (
                                    <span className="text-primary-green font-semibold">{item.dt}</span>
                                )}
                            </div>
                        ) : (
                            <span className="font-semibold text-md">{item.status}</span>
                        )}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default TrackStepper;
