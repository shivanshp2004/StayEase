import PropertyFilter from "@/components/customer-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProperties, fetchPropertyDetails } from "@/store/shop/property-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerPropertyTile from "./property-tile";
import { useSearchParams } from "react-router-dom";
import PropertyDetailsDialog from "@/components/customer-view/property-details";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function CustomerListing() {
  const dispatch = useDispatch();
  const { propertyList, propertyDetails } = useSelector((state) => state.shopProperty);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [location, setLocation] = useState(""); // Add location state

  const handleSort = (value) => {
    setSort(value);
  };

  function handleFilter(getSectionID, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionID);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionID].push(getCurrentOption);
      } else {
        cpyFilters[getSectionID].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleLocationFilter(newLocation) {
    setLocation(newLocation); // Update location state
    let cpyFilters = { ...filters, location: newLocation };
    setFilters(cpyFilters); // Update filters with the location
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetPropertyDetails(getCurrentPropertyID) {
    dispatch(fetchPropertyDetails(getCurrentPropertyID));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters && sort) {
      dispatch(fetchAllFilteredProperties({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  // Set dialog visibility only if propertyDetails has data
  useEffect(() => {
    if (propertyDetails && Object.keys(propertyDetails).length > 0) {
      setOpenDetailsDialog(true);
    } else {
      setOpenDetailsDialog(false);
    }
  }, [propertyDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 ">
      <PropertyFilter filters={filters} handleFilter={handleFilter} handleLocationFilter={handleLocationFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between ">
          <h2 className="text-lg font-extrabold ">All Properties</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground">{propertyList.length} Properties</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] ">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {propertyList && propertyList.length > 0
            ? propertyList.map((propertyItem) => (
                <CustomerPropertyTile
                  handleGetPropertyDetails={handleGetPropertyDetails}
                  property={propertyItem}
                  key={propertyItem.id}
                />
              ))
            : null}
        </div>
      </div>
      <PropertyDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        propertyDetails={propertyDetails}
      />
    </div>
  );
}


export default CustomerListing;
