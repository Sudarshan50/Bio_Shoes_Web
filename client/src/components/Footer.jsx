import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            At <strong>GFoot</strong>, we create biodegradable shoes that reduce
            carbon footprints while delivering quality, comfort, and style.
            Transforming waste into eco-friendly footwear, our products
            harmonize with nature, leaving a lasting positive impact. Step with
            us toward a sustainable future—one shoe at a time.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About Us</li>
            </Link>
            <Link to={"/orders"}>
              <li>Orders</li>
            </Link>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              Phone Number: <a href="tel:+919555525806">+91 9555525806</a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:deepanshudsp200406@gmail.com">
                deepanshudsp200406@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; 2024 GFoot. All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
