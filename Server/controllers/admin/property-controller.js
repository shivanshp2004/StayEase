import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Property from "../../models/Property.js";



const handleImageUpload=async (req,res)=> {
    try{

        const b64=Buffer.from(req.file.buffer).toString('base64');
        const url="data:" + req.file.mimetype + ";base64," + b64;
        const result= await imageUploadUtil(url);

        res.json({
            success: true,
            result
        })

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Some error occured"
        })
    }
}


//add new property


const addProperty= async(req,res)=> {
    try{
        const {title,description,category,location,price,vacancies,totalCapacity,contact,image}=req.body;
        const newlyCreatedProperty= new Property({
            title,
            description,
            category,
            location,
            price,
            vacancies,
            totalCapacity,
            contact,
            image
        })

        await newlyCreatedProperty.save();
        res.status(201).json({
            success: true,
            data : newlyCreatedProperty
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })


    }
}

//fetch all properties

const fetchAllProperties=async(req,res)=> {
    try{
        const listOfProperties=await Property.find();  
        res.status(200).json({
            success: true,
            data: listOfProperties
        }) 
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })


    }
}

//edit the product

const editProperty=async(req,res)=> {
    try{
        const {id}=req.params;
        const {title,description,category,location,price,vacancies,totalCapacity,contact,image}=req.body;


        const findProperty=await Property.findById(id);
        if(!findProperty) return res.status(404).json({
            success: false,
            message: "Property not found"
        })
        
        findProperty.title = title || findProperty.title;
        findProperty.description = description || findProperty.description;
        findProperty.category = category || findProperty.category;
        findProperty.location = location || findProperty.location;
        findProperty.price = price || findProperty.price;
        findProperty.vacancies = vacancies || findProperty.vacancies;
        findProperty.totalCapacity = totalCapacity || findProperty.totalCapacity;
        findProperty.contact = contact || findProperty.contact;
        findProperty.image = image || findProperty.image;

        await findProperty.save();
        res.status(200).json({
            success: true,
            data: findProperty
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })


    }
}

// delete a product

const deleteProperty=async(req,res)=> {
    try{
        const {id}=req.params;
        const property=await Property.findByIdAndDelete(id);
        if(!property) return res.status(404).json({
            success: false,
            message: "Property not found"
        })

        res.status(200).json({
            success: true,
            message: "Property deleted successfully"
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}    
export {handleImageUpload,addProperty,fetchAllProperties,editProperty,deleteProperty}