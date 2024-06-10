
const FormSidebar = ({ title, tag }) => {
    return (
        <div className="loginSidebar bg-primary-green p-5 lg:p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5 relative justify-center">
            <h1 className="font-medium text-white text-3xl z-10">{title}</h1>
            <p className="text-gray-200 text-lg z-10">{tag}</p>
        </div>
    )
}

export default FormSidebar