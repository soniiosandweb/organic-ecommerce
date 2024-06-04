import { Link } from 'react-router-dom';
import cereal from '../../assets/images/Categories/Cereal.jpg';
import dairy from '../../assets/images/Categories/Dairy.jpg';
import drinks from '../../assets/images/Categories/Drinks.jpg';
import fruits from '../../assets/images/Categories/Fruits.jpg';
import vegetable from '../../assets/images/Categories/Vegetable.jpg';

const catNav = [
    {
        name: "Cereal",
        icon: cereal,
    },
    {
        name: "Dairy",
        icon: dairy,
    },
    {
        name: "Drinks",
        icon: drinks,
    },
    {
        name: "Fruits",
        icon: fruits,
    },
    {
        name: "Vegetable",
        icon: vegetable,
    },
]

const Categories = () => {
    return (
        <section className="block bg-white mt-4 mb-4 min-w-full py-4 overflow-hidden">

            <div className="w-full sm:w-11/12 px-4 m-auto flex items-center justify-between flex-wrap">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group w-6/12 md:w-1/5" key={i}>
                        <div className="h-20 w-20 md:h-24 md:w-24 xl:h-40 xl:w-40">
                            <img draggable="false" className="h-full w-full rounded-full object-contain border-4 border-gray" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-xl text-black mt-5 font-medium group-hover:text-primary-green">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
