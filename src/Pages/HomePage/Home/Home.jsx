import Banner from "../Banner/Banner";
import DiscountSection from "../DiscountSection/DiscountSection";
import NumberSection from "../NumberSection/NumberSection";

const Home = () => {
  return (
    <div className="px-[5%] bg-slate-100">
      <Banner></Banner>
      <NumberSection></NumberSection>
      <DiscountSection></DiscountSection>
    </div>
  );
};

export default Home;
