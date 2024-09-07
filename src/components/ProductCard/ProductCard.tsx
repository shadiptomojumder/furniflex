import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatEuroCurrency } from "@/lib/formatPrice";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import { PiHandbagSimple } from "react-icons/pi";

const ProductCard = ({ product }: { product: ProductType }) => {
    const originalPrice = product?.productPrice;
    const discount = parseInt(product?.productDiscount);

    const priceAfterDiscount = originalPrice - (originalPrice * discount) / 100;
    //// console.log("priceAfterDiscount", priceAfterDiscount);p

    const { cartItems, addToCart, removeFromCart, updateCartItem, clearCart } =
        useCart();

    //// console.log("cartItems is:", cartItems);
    const isProductInCart = cartItems.some((item) => item.id === product._id);

    const handleAddToCart = () => {
        addToCart({
            id: product?._id,
            name: product?.productName,
            image: product?.productImage,
            quantity: product?.productQuantity,
            count: 1,
            price: product?.productPrice,
        });
    };

    const handleIncrement = () => {
        const cartItem = cartItems.find((item) => item.id === product?._id);
        if (cartItem) {
            updateCartItem(product._id, {
                ...cartItem,
                count: cartItem.count + 1,
            });
        }
    };

    const handleDecrement = () => {
        const cartItem = cartItems.find((item) => item.id === product._id);
        if (cartItem && cartItem.count > 1) {
            updateCartItem(product._id, {
                ...cartItem,
                count: cartItem.count - 1,
            });
        } else if (cartItem && cartItem.count === 1) {
            removeFromCart(product._id);
        }
    };

    return (
        <div className="p-4 rounded-2xl bg-white border">
            <div className="mb-8">
                <Image
                    src={product?.productImage}
                    alt="product"
                    width={245}
                    height={245}
                    className="md:w-[245px] md:h-[245px] w-[120px] h-[100px] mx-auto rounded-lg object-cover object-center"
                />
            </div>
            <div>
                <div className="p-2 space-y-4 text-center mb-8">
                    <h2 className="text-lg font-semibold text-[#343434] capitalize line-clamp-1">
                        {product?.productName}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        {/* Price After Discount */}
                        {product?.productDiscount &&
                        parseInt(product?.productDiscount) > 0 ? (
                            <p className="text-lg font-bold text-[#343434]">
                                {" "}
                                {formatEuroCurrency(priceAfterDiscount)}
                            </p>
                        ) : null}

                        {/* Original Price */}
                        <p
                            className={`text-lg font-medium ${product?.productDiscount ? "line-through text-[#ABABAB]" : "text-[#343434]"} `}
                        >
                            {formatEuroCurrency(product?.productPrice)}
                        </p>

                        {product?.productDiscount &&
                        parseInt(product?.productDiscount) > 0 ? (
                            <>
                                <p className="text-lg font-semibold text-[#B92E2E]">
                                    {product?.productDiscount}% OFF
                                </p>
                            </>
                        ) : null}
                    </div>
                    <p className="text-sm font-normal text-[#838383] line-clamp-2 min-h-[40px]">
                        {product?.productDescription}
                    </p>
                </div>
                <Button
                    onClick={handleAddToCart}
                    className="w-full text-white px-6 py-5 bg-[#202020] hover:bg-secondary text-[16px] gap-1 font-semibold rounded-md"
                >
                    <PiHandbagSimple size={20} />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
