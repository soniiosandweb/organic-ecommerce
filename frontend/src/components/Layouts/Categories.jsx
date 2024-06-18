import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../actions/categoryAction';

const Categories = () => {

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.allCategories);

    useEffect(()=>{
        dispatch(getCategories());
    },[dispatch]);

    return (
        <section className="block bg-white min-w-full py-16 overflow-hidden">

            <div className="w-full sm:w-11/12 px-4 m-auto flex items-center justify-center flex-wrap gap-4">

                {categories && categories.map((item, i) => (
                    <Link to={`/products?category=${item._id}`} className="flex-1 flex-col gap-1 items-center p-2 group w-1/3 md:w-1/5 text-center product-category-home" key={i}>
                        <div className="h-28 w-28 md:h-32 md:w-32 xl:h-40 xl:w-40 m-auto">
                            <img draggable="false" className="h-full w-full rounded-full object-contain border-4 border-gray" src={item.image.url} alt={item.name} />
                        </div>
                        <p className="text-xl text-black mt-5 font-semibold group-hover:text-primary-green font-lora text-center">{item.name}</p>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
