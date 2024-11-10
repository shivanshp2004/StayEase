import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function CustomerPropertyTile({ property, handleGetPropertyDetails }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={()=>handleGetPropertyDetails(property._id)}>
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {property.vacancies <= 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Full
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2"> {property?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            {property.category!=='pg' ?
            <span className="text-sm text-muted-foreground">
              {property.category[0].toUpperCase() + property.category.slice(1)}
            </span> : <span className="text-sm text-muted-foreground">
              {property.category.toUpperCase()}
            </span>}
            <span className="text-sm text-muted-foreground">
              Vacancies : {property.vacancies}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-md font-semibold text-primary">
            ₹{property.price}/Month
            </span>
            <span className="text-md font-semibold text-primary">
            {property.location}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Click for Details</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default CustomerPropertyTile;
