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
        <section className="block bg-white min-w-full py-16 overflow-hidden">

            <div className="w-full sm:w-11/12 px-4 m-auto flex items-center justify-center flex-wrap gap-4">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex-1 flex-col gap-1 items-center p-2 group w-1/3 md:w-1/5 text-center" key={i}>
                        <div className="h-28 w-28 md:h-32 md:w-32 xl:h-40 xl:w-40 m-auto">
                            <img draggable="false" className="h-full w-full rounded-full object-contain border-4 border-gray" src={item.icon} alt={item.name} />
                        </div>
                        <p className="text-xl text-black mt-5 font-semibold group-hover:text-primary-green font-lora text-center">{item.name}</p>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
