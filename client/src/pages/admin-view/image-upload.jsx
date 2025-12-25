import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
//import { useEffect, useRef } from "react";
import { useRef } from "react";
import { Label } from "@radix-ui/react-label";


function ProductImageUpload({imagefile,setImageFile,uploadedImageUrl,setUploadedImageUrl}) {

    function handleImageFileChange(event) {
    console.log(event.target.files[0]);
    const selectedFile = event.target.files[0];
    if(selectedFile) setImageFile(selectedFile); 
    }

    function handleDragOver(event) {
    event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage() {
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value="";
        }
    }
    
    const inputRef = useRef(null);

    return(
        <div className="w-full max-w-md mx-auto mt-4 ">
            <label className="text-lg font-semibold mb-2 block">Upload Image</label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-deshed rounded-lg p-4"> 
            <Input  id="image-upload" type="file" className="hidden" ref={inputRef}  onChange={handleImageFileChange} />
                {!imagefile ? (
                    <Label htmlFor="image-upload"  className={` flex flex-col items-center justify-center h-32 cursor-pointer`} >                       
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span className="text-sm text-muted-foreground">Drag & drop or click to upload image</span>                     
                    </Label>
                ) :(
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imagefile.name}</p>    
                        <Button vaariant="ghost" size="icon" className="text-muted-foreground" onClick={handleRemoveImage} >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                    )
                }
            </div>
        </div>

    )
}

export default ProductImageUpload;