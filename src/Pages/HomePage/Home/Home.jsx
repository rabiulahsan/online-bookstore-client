import AuthorSection from "../AuthorSection/AuthorSection";
import Banner from "../Banner/Banner";
import CategorySection from "../CategorySection/CategorySection";
import DiscountSection from "../DiscountSection/DiscountSection";
import Faqs from "../Faqs/Faqs";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import NumberSection from "../NumberSection/NumberSection";
import ReviewSection from "../ReviewSection/ReviewSection";
import SubscriptionSection from "../SubscriptionSection/SubscriptionSection";

const Home = () => {
  return (
    <div className="px-[5%] bg-slate-100">
      <Banner></Banner>
      <NumberSection></NumberSection>
      <CategorySection></CategorySection>
      <FeaturedSection></FeaturedSection>
      {/* <AuthorSection></AuthorSection> */}
      <DiscountSection></DiscountSection>
      <ReviewSection></ReviewSection>
      <Faqs></Faqs>
      <SubscriptionSection></SubscriptionSection>
    </div>
  );
};

export default Home;
