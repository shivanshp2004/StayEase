import PropertyImageUpload from "@/components/admin-view/image-upload";
import AdminPropertyTile from "@/components/admin-view/property-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addPropertyFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProperty, deleteProperty, editProperty, fetchAllProperties } from "@/store/admin/property-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData={
    image:null,
    title:"",
    description:"",
    category:"",
    location:"",
    price: "",
    vacancies: "",
    totalCapacity: "",
    contact: "",
}
 const onSubmit=()=> {

 }
function AdminProperty() {
    const [openCreatePropertyDialog, setOpenCreatePropertyDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageURL, setUploadedImageURL] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch=useDispatch();
    const {propertyList}=useSelector(state=>state.adminProperty);
    const {toast}=useToast();
    const [currentEditedID, setCurrentEditedID] = useState(null);

    function onSubmit(event) {
        event.preventDefault();
        currentEditedID!==null ? dispatch(editProperty({
            formData,
            id: currentEditedID
        })).then((data)=> {
            console.log(data);
            if(data?.payload?.success) {
                dispatch(fetchAllProperties());
                setFormData(initialFormData);
                setOpenCreatePropertyDialog(false);
                setCurrentEditedID(null)
                toast({
                    title: "Property edited successfully",
                })
            }
        }) :
        dispatch(addNewProperty({
            ...formData,
            image: uploadedImageURL
        })).then((data)=> {
            console.log(data);
            if(data?.payload?.success) {
                dispatch(fetchAllProperties());
                setOpenCreatePropertyDialog(false);

                setImageFile(null);
                setFormData(initialFormData);
                toast({
                    title: "Property added successfully",
                })
            }   
        })
    }

    function handleDelete(getCurrentPropertyID) {
        console.log(getCurrentPropertyID);
        dispatch(deleteProperty(getCurrentPropertyID)).then(data=> {
            if(data?.payload?.success) {
                dispatch(fetchAllProperties());
                toast({
                    title: "Property deleted successfully",
                })
        } 
    })
}

    function  isFormValid() {
        return Object.keys(formData).map(key=> formData[key]).every(value=> value!=='');
    }

    useEffect(()=> {
        dispatch(fetchAllProperties())
    },[dispatch])

    return (  
        <Fragment>
            <div className="mb-5 w-full flex justify-end ">
                <Button onClick={()=> {setOpenCreatePropertyDialog(true)}}> Add new Property</Button>
            </div>
            <div className="grid gap-4  md:grid-cols-3 lg:grid-cols-4 ">
                {
                    propertyList && propertyList.length>0 ? 
                    propertyList.map(propItem=><AdminPropertyTile setCurrentEditedID={setCurrentEditedID} setOpenCreatePropertyDialog={setOpenCreatePropertyDialog} setFormData={setFormData} property={propItem} handleDelete={handleDelete}/>) :
                         <div className="font-extrabold text-3xl">No Property Uploaded</div>
                    
                }   
            </div>
            <Sheet open={openCreatePropertyDialog} onOpenChange={()=>{setOpenCreatePropertyDialog(false)
                setCurrentEditedID(null)
                setFormData(initialFormData)} 
            }>
                <SheetContent side='right' className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedID!==null ? 'Edit Property' : 'Add Property'
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <PropertyImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageURL={uploadedImageURL} setUploadedImageURL={setUploadedImageURL}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={currentEditedID!==null}
                    />
                    {console.log(uploadedImageURL)}
                    <div className="py-6 ">
                        <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData}
                         buttonText={currentEditedID ? "Edit" : "Add"} formControls={addPropertyFormElements} isFormValid={isFormValid}
                         isBtnDisabled={!isFormValid()}  />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProperty;