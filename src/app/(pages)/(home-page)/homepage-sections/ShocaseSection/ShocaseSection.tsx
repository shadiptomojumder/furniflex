import { FaTruckFast } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoBagCheckOutline } from "react-icons/io5";
import { Package } from "lucide-react";

const ShocaseSection = () => {
    return (
        <main className="p-5 bg-white rounded-lg drop-shadow-lg my-5 hidden lg:block">
            <section className="grid grid-cols-4">
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <FaTruckFast className="text-[#00B307]" size={40} />
                    </div>
                    <div>
                        <h2 className="text-[#1A1A1A] font-bold">Free Shipping</h2>
                        <p className="text-[#999999] text-sm">Free shipping on all your order</p>
                    </div>
                </section>
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <TfiHeadphoneAlt  className="text-[#00B307]" size={40} />
                    </div>
                    <div>
                        <h2 className="text-[#1A1A1A] font-bold">Customer Support 24/7</h2>
                        <p className="text-[#999999] text-sm">Instant access to Support</p>
                    </div>
                </section>
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <IoBagCheckOutline className="text-[#00B307]" size={40} />
                    </div>
                    <div>
                        <h2 className="text-[#1A1A1A] font-bold">100% Secure Payment</h2>
                        <p className="text-[#999999] text-sm">We ensure your money is save</p>
                    </div>
                </section>
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <Package className="text-[#00B307]" size={40}/>
                    </div>
                    <div>
                        <h2 className="text-[#1A1A1A] font-bold">Money-Back Guarantee</h2>
                        <p className="text-[#999999] text-sm">30 Days Money-Back Guarantee</p>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default ShocaseSection;
