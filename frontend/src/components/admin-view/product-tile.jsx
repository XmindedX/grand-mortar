import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white border-gray-300 shadow-md">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg border-b shadow-sm"
          />
        </div>
        <CardContent>
          <h2 className="mt-2 mb-2 text-xl font-bold text-black">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2 text-slate-700">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold `}
            >
              Rp {product?.price.toLocaleString("id-ID")}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">Rp {product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            className="bg-blue-600 hover:bg-blue-800"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleDelete(product?._id)}>Hapus</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
