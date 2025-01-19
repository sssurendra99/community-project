'use server'

import path from "path";
import { promises as fs } from "fs";

export const getAllBannerImages = async () => {
  const bannersDirectory = path.join(process.cwd(), '/public/banners/');
  const bannerFileNames = await fs.readdir(bannersDirectory);
  console.log(bannerFileNames);
  console.log(bannerFileNames.length);
  return bannerFileNames.filter((imageFileName) => {
    const extension = path.extname(imageFileName).toLowerCase();
    return ['.jpg','.jpeg','.webp','.png'].includes(extension);
  });
};