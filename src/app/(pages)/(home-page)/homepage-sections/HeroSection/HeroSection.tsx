import Image from "next/image";
import Banner1 from "../../../../../../public/banners/banner1.png";
import Banner2 from "../../../../../../public/banners/banner2.png";
import Banner3 from "../../../../../../public/banners/banner3.png";

const HeroSection = () => {
    return (
        <main className="py-5">
            <section className="flex items-center justify-between">
                <div className="lg:w-[65%] w-full h-full bg-gray-300 rounded-lg overflow-hidden">
                    <Image src={Banner1} alt="banner" className="rounded-lg w-full h-full" />
                </div>
                <section className="w-[30%] 2xl:h-[560px] hidden lg:flex flex-col justify-between gap-5">
                    <div className="h-[230px] bg-gray-300 rounded-lg overflow-hidden">
                        <Image
                            src={Banner2}
                            alt="banner"
                            placeholder="blur"
                            className="rounded-lg h-full object-cover object-center"
                        />
                    </div>
                    <div className="h-[230px] bg-gray-300 rounded-lg overflow-hidden">
                        <Image
                            src={Banner3}
                            alt="banner"
                            className="rounded-lg w-full h-full"
                        />
                    </div>
                </section>
            </section>
        </main>
    );
};

export default HeroSection;
