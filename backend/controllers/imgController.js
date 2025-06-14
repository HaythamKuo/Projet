import dotenv from "dotenv";
dotenv.config();
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

function getUploadAuth() {
  return imagekit.getAuthenticationParameters();
}

export async function getImgsAuth(req, res, next) {
  try {
    const { token, expire, signature } = getUploadAuth();
    res.json({
      token,
      expire,
      signature,
      publicKey: process.env.IK_PUBLIC_KEY,
    });
  } catch (err) {
    next(err);
  }
}
