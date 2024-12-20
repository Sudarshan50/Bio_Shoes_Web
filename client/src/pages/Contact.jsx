import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded-md"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-gray-500 font-semibold text-xl">Our Store</p>
          <p className="text-gray-600">
            IIT Delhi,
            <br />
            Hauz Khas, New Delhi, India
          </p>

          <p className="text-gray-600">
            Tel: <a href="tel:+919555525806"> +919555525806</a>
            <br />
            Email:{" "}
            <a href="mailto:deepanshudsp200406@gmail.com">
              deepanshudsp200406@gmail.com
            </a>
          </p>
          <p className="font-semibold text-xl text-gray-600">Know More</p>
          <p className="text-gray-600">
            Connect on Linked In to know more about us and our team.
          </p>
          <button
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/deepanshu-pandey-6baab9266/",
                "_blank"
              )
            }
          >
            Connect
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
