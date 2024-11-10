import cloudinary from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: "dmhw5g5es",
    api_key: "662289714596913",
    api_secret: "ZO8Es4kLPx8fsXI7P6QCm9sGa7o"
})

const storage=new multer.memoryStorage();

async function imageUploadUtil (file) {
    const result= await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    return result;
}

const upload=multer({storage});

export {upload, imageUploadUtil};