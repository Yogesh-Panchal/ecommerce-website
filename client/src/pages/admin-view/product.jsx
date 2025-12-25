import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Fragment } from "react/jsx-runtime";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "./image-upload";
import { Button } from "@/components/ui/button";

const intialformdata={
  Image:"",
  title:"",
  discription:"",
  category:"",
  price:"",
  salesprice:"",
  totalstock:"",
}

function onSubmit (){

}

function AdminProduct() {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]= useState(false);
  const [formData,setFormData]= useState(intialformdata);
  const [imagefile,setImageFile]= useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]= useState("");

  return (
    <Fragment>        
        <div className="mb-5 w-full flex justify-end">
        <Button
          className="inline-flex px-4 py-2 rounded-md bg-black text-white"
          onClick={() => setOpenCreateProductsDialog(true)}
        >
          Add New Product
        </Button>
      </div>


        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mr-3 "></div>
        {/* <Sheet open={openCreateProductsDialog} onOpenChange={() => { setOpenCreateProductsDialog(false);}}> */}
        <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
          <SheetContent side="right" className="overflow-auto mr-0 ">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload imagefile={imagefile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />     
             <div className="py-6">
              <CommonForm  onSubmit={onSubmit} formcontrols ={addProductFormElements} formData={formData} setFormData={setFormData} buttonText='Add' />
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  )
}
export default AdminProduct;
