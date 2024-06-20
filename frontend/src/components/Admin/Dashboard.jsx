import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = ({ activeTab, children }) => {

    // const [onMobile, setOnMobile] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(true);

    useEffect(() => {
        if (window.innerWidth > 1024 ) {
            // setOnMobile(true);
            setToggleSidebar(true);
        }
        const resizeHandler = () => {
            if (window.innerWidth > 1024 ) {
                // setOnMobile(true);
                setToggleSidebar(true);
            }
        }; 
        window.addEventListener('resize', resizeHandler);
    }, [])

    return (
        <>
            <main className="flex min-h-screen sm:min-w-full">

                {/* {!onMobile && <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar} />} */}
                {toggleSidebar && <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar}/>}

                <div className="w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen">
                    <div className="flex flex-col gap-6 p-4 sm:p-10 pb-6 overflow-hidden">
                        <button onClick={() => setToggleSidebar(true)} className="lg:hidden bg-gray-700 w-10 h-10 rounded-sm shadow text-white flex items-center justify-center"><MenuIcon /></button>
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
