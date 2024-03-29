import Testimonials from '../../Components/Testimonials/Testimonials';
import Banner from '../../Components/Banner2/Banner';
import Chatbot from '../../Components/Chatbot/Chatbot';
import ExploreTypes from '../../Components/ExploreTypes/ExploreTypes';
import LatestBlogHome from '../../Components/LatestBlogHome/LatestBlogHome';
import ContactUs from '../../Components/Contract/ContactUs/ContactUs';

const Home = () => {

  return (
      <div className='max-w-[1440px] mx-auto px-4 dark:bg-primary-dark ' >
        <Banner/>
        <ExploreTypes></ExploreTypes>
        <LatestBlogHome></LatestBlogHome>
        <Testimonials />
        <Chatbot />
        <ContactUs />
      </div >
  );
};

export default Home;