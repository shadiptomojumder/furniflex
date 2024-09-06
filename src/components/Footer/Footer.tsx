import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import FotterLogo from "../../../public/images/FotterLogo.png";
import Flag from "../../../public/images/usa.png";

const Footer = () => {
    return (
        <footer className="bg-[#0E0E0E]">
            <section className="container">
                <div className="grid grid-cols-5 gap-5 py-10 border-b-2 border-[#252948] ">
                    <div className="md:col-span-2 col-span-5 sm:mx-0 mx-auto">
                        <Image
                            src={FotterLogo}
                            alt="Furniflex"
                            width={135}
                            height={100}
                            className="w-[135px] h-auto"
                        />
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <h2 className="text-lg font-semibold text-white">
                            About US
                        </h2>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Master Plan
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Jobs
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Invest
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Pressroom
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Blog
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Contact
                        </p>
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <h2 className="text-lg font-semibold text-white">
                            Explore EEVE
                        </h2>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Unlock my Robot Power
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Starlight
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Robot Platform
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            EEVE Roadmap
                        </p>
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <h2 className="text-lg font-semibold text-white">
                            Community & Support
                        </h2>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Willow X Community
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Developer & Maker Access
                        </p>
                        <p className="text-lg font-semibold text-[#81859F]">
                            Special Cases
                        </p>
                    </div>
                </div>
            </section>
            <section className="container py-10 grid md:grid-cols-3 grid-cols-1 gap-5">
                <div className="flex items-center md:justify-start justify-center gap-3">
                    <FiFacebook size={20} className="text-[#DFDFDF]" />
                    <FiInstagram size={20} className="text-[#DFDFDF]" />
                    <FaXTwitter size={20} className="text-[#DFDFDF]" />
                    <SlSocialLinkedin size={20} className="text-[#DFDFDF]" />
                </div>
                <div className="flex items-center md:justify-start justify-center flex-wrap gap-3">
                    <p className="sm:text-lg text-base font-semibold text-nowrap text-[#81859F]">
                        March22 Recap
                    </p>
                    <p className="sm:text-lg text-base font-semibold text-nowrap text-[#81859F]">
                        Privacy Policy
                    </p>
                    <p className="sm:text-lg text-base font-semibold text-nowrap text-[#81859F]">
                        General Terms
                    </p>
                    <p className="sm:text-lg text-base font-semibold text-nowrap text-[#81859F]">
                        Contact
                    </p>
                </div>
                <div className="flex items-center md:justify-start justify-center gap-1">
                    <Image
                        src={Flag}
                        alt="Furniflex"
                        width={20}
                        height={20}
                        className="w-[20px] h-auto"
                    />
                    <p className="sm:text-lg text-base font-semibold text-nowrap text-[#81859F]">
                        United States (English)
                    </p>
                </div>
            </section>
            <div className="text-center container py-8">
                <p className="text-lg font-semibold text-[#323544]">
                EEVE © 2024. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
