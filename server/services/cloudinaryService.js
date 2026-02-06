const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadAudioBuffer(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'video',
          folder: 'valentine_audio',
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
      .end(buffer);
  });
}

module.exports = {
  uploadAudioBuffer,
};

