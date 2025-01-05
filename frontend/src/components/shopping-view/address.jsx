import { useEffect, useState } from "react";
import CheckoutForm from "../common/checkoutForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleProcessOrder() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        phone: formData.phone,
        notes: formData.notes,
      },
      orderStatus: "Pending",
      paymentStatus: "Lunas",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      // console.log(data, "order");
    });
    navigate("/admin/orders");
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  // console.log(cartItems, "cartItems");

  return (
    <Card className="w-full bg-white text-black border-gray-300 shadow-md">
      <CardHeader>
        <CardTitle>
          Alamat Pengiriman
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CheckoutForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText= "Proses Pesanan"
          onSubmit={handleProcessOrder}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
