import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full  justify-between items-center border bg-white rounded-sm overflow-hidden searchbar-header hidden lg:flex">
            <input name="header-search-bar" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-md flex-1 outline-none border-none placeholder-gray-500 px-4 sm:px-6 py-3 focus:border focus:border-primary-green focus:border-solid" type="text" placeholder="Search Product..." />
            <button type="submit" className="py-3 px-4 text-white bg-primary-green h-full"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
