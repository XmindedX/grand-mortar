import ProductImageUpload from "@/components/admin-view/image-upload";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpDownIcon, ShoppingCart } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { addToCart } from "@/store/shop/cart-slice";
import UserCartWrapper from "@/components/shopping-view/cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";

function AddOrder() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchAllProducts());
    }, [dispatch]);

  useEffect(() => {
      dispatch(fetchCartItems(user?.id));
    }, [dispatch]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
      // console.log(cartItems);
      let getCartItems = cartItems.items || [];
  
      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCurrentProductId
        );
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
  
            return;
          }
        }
      }
  
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Produk berhasil ditambahkan ke keranjang",
          });
        }
      });
    }

  function handleGetProductDetails(getCurrentProductId) {
      dispatch(fetchProductDetails(getCurrentProductId));
    }
    
  
    function handleAddtoCart(getCurrentProductId) {
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Produk berhasil ditambahkan ke keranjang",
          });
        }
      });
    }
  
    // console.log(productList, "List Produk");

  return (
    <div>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <div className="flex w-full justify-end">
      <p className="text-2xl text-black font-bold justify-start ml-1 sm:ml-0 mr-auto md:mt-1  mt-6">Daftar Produk</p>
        <Button
          onClick={() => setOpenCartSheet(true)}
          
          size="icon"
          className="inline-flex relative w-36 h-12  bg-blue-700 mt-3 mr-1 lg:mr-0 lg:mt-0">
          <ShoppingCart className="w-6 h-6 mr-auto ml-2" />
          <span className="absolute top-[-1px] right-auto left-7 font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <p className="absolute my-auto font-bold text-sm ml-7">Keranjang</p>
          <span className="sr-only">User cart</span>
        </Button>
        </div>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <section className="py-5 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddOrder;
