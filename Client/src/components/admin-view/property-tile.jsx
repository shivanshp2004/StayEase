import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminPropertyTile({ property,setOpenCreatePropertyDialog,setCurrentEditedID,setFormData, isEditMode,handleDelete }) {
    const category=property?.category?.charAt(0).toUpperCase()+property?.category?.slice(1);
  return (
    <Card className="w-full max-w-sm mx-auto ">
      <div>
        <div className="relative ">
          <img
            src={property.image}
            alt={property?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2" >{property?.title}</h2>
            <div className="flex justify-between items-center mb-2">
                <span className={`text-lg font-semibold text-primary`} >Rs. {property?.price}/Month</span>
                <span className="text-lg font-bold">{ category}</span>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center" >
            <Button onClick={()=> {
                setOpenCreatePropertyDialog(true);
                setCurrentEditedID(property._id);
                setFormData(property);
            }} >Edit</Button>
            <Button onClick={()=>handleDelete(property?._id) } >Delete</Button>

        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminPropertyTile;
