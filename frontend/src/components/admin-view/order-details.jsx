import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");



  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] md:h-[700px] overflow-auto no-scrollbar mb-5 bg-white border border-gray-200 text-black">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">ID Pesanan</p>
            <Label>{orderDetails?.transactionId}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Tanggal Pemesanan</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Harga</p>
            <Label>Rp {orderDetails?.totalAmount.toLocaleString("id-ID")}</Label>
          </div>
          {/* <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div> */}
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Status Pembayaran</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Status Pesanan</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "Terkirim"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "Rejected"
                    ? "bg-red-600"
                    : "bg-blue-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Detail Pesanan</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>{item.title}</span>
                      <span>Jumlah: {item.quantity}</span>
                      <span>Harga: Rp {item.price.toLocaleString("id-ID")}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Informasi Pengiriman</div>
            <div className="grid gap-0.5 text-slate-800">
              <span>Dibuat oleh : {orderDetails?.userId.userName}</span>
              <span>Alamat : {orderDetails?.addressInfo?.address}</span>
              <span>Kota : {orderDetails?.addressInfo?.city}</span>
              <span>Kode Pos : {orderDetails?.addressInfo?.pincode}</span>
              <span>Nomor Telepon : {orderDetails?.addressInfo?.phone}</span>
              <span>Catatan : {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Status Pesanan",
                name: "status",
                componentType: "select",
                options: [
                  { id: "Pending", label: "Pending" },
                  { id: "Diproses", label: "Diproses" },
                  { id: "Dalam Pengiriman", label: "Dalam Pengiriman" },
                  { id: "Terkirim", label: "Terkirim" },
                  { id: "Dibatalkan", label: "Dibatalkan" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Status Pesanan"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
