import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-md"
          src={assets.about_img}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Bio Shoes is dedicated to providing eco-friendly and sustainable
            footwear. Our mission is to combine style, comfort, and
            environmental responsibility. Each pair of shoes is crafted with
            care, using recycled materials and innovative techniques. Join us in
            our journey to make the world a greener place, one step at a time.
          </p>
          <p>
            Our shoes are designed to be durable and long-lasting, so you can
            enjoy them for years to come. We believe that fashion should not
            come at the expense of the planet, which is why we are committed to
            reducing our carbon footprint and promoting sustainable practices.
            With Bio Shoes, you can look good and feel good about your footwear.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At <strong>GFoot</strong>, we’re passionate about creating biodegradable shoes that
            reduce carbon footprints without sacrificing quality, comfort, or
            style. Our innovative approach transforms environmental waste into
            eco-friendly footwear, ensuring every Gfoot product is inspired by
            nature, works in harmony with the planet, and leaves a positive
            impact far beyond its lifecycle. Join us in stepping toward a more
            sustainable future—one shoe at a time.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We take pride in the quality of our products and ensure that each
            pair of shoes meets our high standards. Our shoes are designed to be
            durable and long-lasting, so you can enjoy them for years to come.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We offer a wide range of styles and sizes to suit your needs. Our
            online store makes it easy to browse and purchase your favorite
            shoes from the comfort of your home. With fast shipping and secure
            payment options, shopping with us is convenient and hassle-free.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our team is dedicated to providing exceptional customer service and
            ensuring that you are satisfied with your purchase. If you have any
            questions or concerns, we are here to help. Contact us today to
            learn more about our products and services.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
