import { PHOTOS_EXTENSIONS } from "@/app/ui/files/constants";

export const parseFileName = (filename: string) => {
  const extension = filename.split(".").at(-1) || "";
  const isImage = PHOTOS_EXTENSIONS.some((photoExt) => photoExt === extension);

  return { extension, isImage };
};
