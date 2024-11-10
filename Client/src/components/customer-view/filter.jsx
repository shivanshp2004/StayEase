import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input"; // Importing Input component from Shadcn UI

function PropertyFilter({ filters, handleFilter, handleLocationFilter }) {
    const [location, setLocation] = useState("");

    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        handleLocationFilter(newLocation); // Call the handleLocationFilter on typing
    };

    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map((keyItem) => (
                        <Fragment key={keyItem}>
                            <div>
                                <h3 className="text-base font-bold">{keyItem[0].toUpperCase()}{keyItem.slice(1)}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        filterOptions[keyItem].map((option) => (
                                            <Label key={option.id} className="flex font-medium items-center gap-2">
                                                <Checkbox
                                                    checked={filters && filters[keyItem] && filters[keyItem].indexOf(option.id) > -1}
                                                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                                                />
                                                {option.label}
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                            <Separator />
                        </Fragment>
                    ))
                }
                {/* Location input section */}
                <div className="mt-4">
                    <Label className="text-base font-bold mb-2">Location</Label>
                    <Input 
                        type="text" 
                        placeholder="Enter location" 
                        value={location} 
                        onChange={handleLocationChange} 
                        className="mt-2"
                    />
                </div>
            </div>
            <Separator/>
        </div>
    );
}


export default PropertyFilter;
