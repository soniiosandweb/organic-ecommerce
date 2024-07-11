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
        <form onSubmit={handleSubmit} className="w-full justify-between items-center border-0 bg-white overflow-hidden searchbar-header hidden lg:flex">
            <input name="header-search-bar" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-md flex-1 outline-none border border-solid border-gray-300 placeholder-gray-500 px-4 sm:px-6 h-12 focus:border-primary-green" type="text" placeholder="Search Product..." />
            <button type="submit" className="h-12 px-4 border border-solid border-primary-green text-white bg-primary-green"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
