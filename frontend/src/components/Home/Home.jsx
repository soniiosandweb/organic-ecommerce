import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import ProductServices from './ProductServices/ProductServices';
import Testimonials from './Testimonials/Testimonials';
import CategoriesBanner from './CategoriesBanner/CategoriesBanner';
import Faq from './Faq/Faq';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Online Shopping Site for Organic Products. Best Offers!" />
      
      <main className="flex flex-col gap-3">
        <Banner />
        <Categories />

        <CategoriesBanner />
        
        {!loading && <ProductSlider title={"Trending Products"} tagline={"Latest Products"} />}

        <ProductServices />

        <Testimonials />

        <Faq />

      </main>
    </>
  );
};

export default Home;
