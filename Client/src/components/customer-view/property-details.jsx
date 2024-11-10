import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { ClipboardIcon, MapPinIcon, DollarSignIcon, UsersIcon, UsersRound } from "lucide-react";
import { useState, useEffect } from "react";

function PropertyDetailsDialog({ open, setOpen, propertyDetails }) {
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleContactOwnerClick = () => {
    setIsPhoneNumberVisible(true);
  };

  const handleCopyPhoneNumber = () => {
    navigator.clipboard.writeText(propertyDetails.contact);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (!open) {
      setIsPhoneNumberVisible(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl max-w-[90vw] p-8 sm:p-12 bg-white shadow-2xl rounded-xl border border-gray-100 transition-all overflow-hidden sm:h-auto h-[80vh] sm:overflow-visible overflow-y-auto">
        {/* Title */}
        <DialogTitle className="text-4xl font-extrabold text-gray-900 mt-4">{propertyDetails.title}</DialogTitle>

        {/* Description Section */}
        <div className="mt-4 sm:mt-6 md:mt-8 max-h-[200px] overflow-y-auto">
          <p className="text-xl text-gray-700 leading-relaxed">{propertyDetails.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
          {/* Image Section */}
          <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              src={propertyDetails?.image}
              alt={propertyDetails?.title}
              className="w-full h-[500px] sm:h-[350px] md:h-[450px] object-cover rounded-xl hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Property Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Price */}
              <div className="flex items-center gap-3 mt-6 text-lg font-semibold text-gray-800">
                <DollarSignIcon className="h-7 w-7 text-blue-600" />
                <span className="text-xl">₹{propertyDetails?.price}/Month</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 mt-6 text-lg font-semibold text-gray-800">
                <MapPinIcon className="h-7 w-7 text-red-600" />
                <span className="text-xl">{propertyDetails?.location}</span>
              </div>

              {/* Vacancies */}
              <div className="flex items-center gap-3 mt-6 text-lg font-semibold text-gray-800">
                <UsersIcon className="h-7 w-7 text-green-600" />
                <span className="text-xl">Vacancies: {propertyDetails?.vacancies}</span>
              </div>

              {/* Capacity */}
              <div className="flex items-center gap-3 mt-6 text-lg font-semibold text-gray-800">
                <UsersRound className="h-7 w-7 text-purple-600" />
                <span className="text-xl">Capacity: {propertyDetails?.totalCapacity}</span>
              </div>
            </div>

            {/* Separator */}
            <Separator className="mt-6" />
          </div>
        </div>

        {/* Contact Owner Button */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center sm:mt-0 mt-8 sm:col-span-2">
          <Button
            variant="solid"
            className="w-full sm:w-[60%] bg-gray-800 text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-600 rounded-xl py-3 transition duration-200"
            onClick={handleContactOwnerClick}
          >
            {isPhoneNumberVisible ? (
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-white">{propertyDetails.contact}</span>
                <button
                  onClick={handleCopyPhoneNumber}
                  className="text-green-500 hover:text-green-700 transition duration-200 p-2 rounded-full"
                  title="Copy Phone Number"
                >
                  <ClipboardIcon className="h-6 w-6" />
                </button>
                {copied && (
                  <span className="text-sm text-green-500 ml-2">Copied!</span>
                )}
              </div>
            ) : (
              "Contact Owner"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PropertyDetailsDialog;
