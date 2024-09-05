import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { CirclePlus, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductData {
    _id: string;
    productName: string;
    productPrice: number;
    productQuantity: string;
    productCategory: string;
    productDescription: string;
    productStock: number;
    productImage: string;
    productImageOne: string;
    productImageTwo: string;
    productImageThree: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const ProductCard = ({ productData }: { productData: ProductData }) => {
    const { productName, productPrice, productQuantity } = productData;

    const { cartItems, addToCart, removeFromCart, updateCartItem, clearCart } =
        useCart();

    //console.log("cartItems is:", cartItems);
    const isProductInCart = cartItems.some(
        (item) => item.id === productData._id
    );

    const handleAddToCart = () => {
        addToCart({
            id: productData?._id,
            name: productData?.productName,
            image: productData?.productImage,
            quantity: productData?.productQuantity,
            count:1,
            price: productData?.productPrice,
        });
    };

    const handleIncrement = () => {
        const cartItem = cartItems.find((item) => item.id === productData?._id);
        if (cartItem) {
            updateCartItem(productData._id, {
                ...cartItem,
                count: cartItem.count + 1,
            });
        }
    };

    const handleDecrement = () => {
        const cartItem = cartItems.find((item) => item.id === productData._id);
        if (cartItem && cartItem.count > 1) {
            updateCartItem(productData._id, {
                ...cartItem,
                count: cartItem.count - 1,
            });
        } else if (cartItem && cartItem.count === 1) {
            removeFromCart(productData._id);
        }
    };

    return (
        <section className="bg-white relative disabled:bg-red-400 sm:p-3 p-[5px] w-full md:min-w-[220px] flex flex-col justify-between group border shadow rounded-md cursor-pointer transition-all duration-300">
            <div className="relative">
                <Image
                    src={productData?.productImage}
                    alt="product"
                    width={150}
                    height={150}
                    className="md:w-[150px] md:h-[150px] w-[120px] h-[100px] mx-auto object-cover object-center"
                />

                {/* ADD TO CART BUTTON FOR MOBILE DEVICES */}
                {!isProductInCart ? (
                    <div
                        onClick={handleAddToCart}
                        className="text-primary min-[424px]:hidden absolute bottom-0 right-3 h-[30px] w-[30px] flex justify-center items-center rounded-full bg-white shadow-2xl"
                    >
                        <Plus />
                    </div>
                ) : (
                    <div className="text-white min-[424px]:hidden absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-between shadow-lg gap-1 rounded-full w-[90%] bg-yellow-500">
                        <button
                            onClick={handleDecrement}
                            className="p-[1px] text-gray-800 w-fit px-3"
                        >
                            <Minus />
                        </button>
                        <p className="text-base text-gray-900 font-semibold">
                            {
                                cartItems.find(
                                    (item) => item.id === productData._id
                                )?.count
                            }
                        </p>
                        <button
                            onClick={handleIncrement}
                            className="p-[1px] text-gray-800 w-fit px-3"
                        >
                            <Plus />
                            {/* <CirclePlus/> */}
                        </button>
                    </div>
                )}
            </div>
            <section className="flex flex-col justify-between gap-1 h-full min-[424px]:mt-1 mt-3">
                <Link href="#">
                    <h2 className="text-[#1A1A1A] text-center capitalize text-sm line-clamp-2 font-medium hover:underline transition-all duration-300 text-ellipsis">
                        {productName}
                    </h2>
                </Link>
                <div className="sm:space-y-2 space-y-1 text-center">
                    <p className="text-[#1A1A1A] sm:text-base text-sm font-medium">
                        {productQuantity}
                    </p>
                    <p className="text-[#1A1A1A] text-base font-bold">
                        ৳{productPrice}
                    </p>

                    {!isProductInCart ? (
                        <button
                            className="text-white hidden py-1 min-[424px]:flex items-center justify-center shadow-lg gap-1 rounded-full w-full bg-[#00B307]"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart
                                size={20}
                                className=" text-[#FFFFFF]"
                            />
                            Add to cart
                        </button>
                    ) : (
                        <div className="text-white hidden min-[424px]:flex items-center justify-around shadow-lg gap-1 rounded-full w-full bg-yellow-500 min-h-[32px]">
                            <button
                                onClick={handleDecrement}
                                className="p-[1px] h-[32px] text-gray-800 border-r-2 pr-4 border-gray-600"
                            >
                                <Minus />
                            </button>
                            <p className="text-base text-gray-900 font-semibold">
                                {
                                    cartItems.find(
                                        (item) => item.id === productData._id
                                    )?.count
                                }{" "}
                                in Bag
                            </p>
                            <button
                                onClick={handleIncrement}
                                className="p-[1px] h-[32px] text-gray-800 border-l-2 pl-4 border-gray-600"
                            >
                                <Plus />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {productData?.productStock === 0 ? (
                <div
                    className={`w-full h-full bg-white bg-opacity-[0.6] absolute left-0 top-0 rounded-md`}
                >
                    {productData?.productStock === 0 ? (
                        <Badge className="bg-yellow-400 hover:bg-yellow-400 absolute top-2 left-2">
                            Out of stocks
                        </Badge>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <></>
            )}
            {/* <div className={`w-full h-full bg-white bg-opacity-[0.6]  absolute left-0 top-0 rounded-md`}>
            {productData?.productStock === 0 ? (
                    <Badge className="bg-yellow-400 absolute top-2 left-2">
                        Out of stocks
                    </Badge>
                ) : (
                    ""
                )}
            </div> */}
        </section>
    );
};

export default ProductCard;
