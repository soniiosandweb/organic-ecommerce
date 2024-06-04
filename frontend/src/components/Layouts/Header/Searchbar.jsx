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
        <form onSubmit={handleSubmit} className="w-full px-4 sm:px-8 py-3 justify-between items-center shadow bg-white rounded-full overflow-hidden searchbar-header hidden lg:flex">
            <input name="header-search-bar" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-sm flex-1 outline-none border-none placeholder-gray-500" type="text" placeholder="Search Product..." />
            <button type="submit" className="text-primary-green"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
