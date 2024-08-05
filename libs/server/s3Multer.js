const s3Multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");

const fileType = (file) => {
  let type = "";
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    type = "jpg";
  } else if (file.mimetype === "image/png") {
    type = "png";
  } else if (file.mimetype === "image/bmp") {
    type = "bmp";
  } else if (file.mimetype === "image/gif") {
    type = "gif";
  } else if (file.mimetype === "image/svg+xml") {
    type = "svg";
  } else if (file.mimetype === "image/webp") {
    type = "webp";
  }
  return type;
};

const upload = s3Multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        accessKeyId: process.env.S3_UPLOAD_KEY,
        secretAccessKey: process.env.S3_UPLOAD_SECRET,
      },
      region: "ap-northeast-2",
    }),
    bucket: process.env.S3_UPLOAD_BUCKET,
    //acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const type = fileType(file);
      cb(
        null,
        `${(req?.user?.username ?? Date.now()) + "_" + Date.now()}.${type}`
      );
    },
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
});

module.exports = upload;
