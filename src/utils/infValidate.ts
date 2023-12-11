import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

interface ImagePath {
  rawPath: string;
  targetPath: string;
}
export const getImagePath = (
  filename: string,
  width: string,
  height: string,
): ImagePath => {
  const rawPath = path.resolve(
    __dirname,
    '..',
    '..',
    'assets',
    'rawImage',
    filename + '.jpg',
  );
  const targetPath = path.resolve(
    __dirname,
    '..',
    '..',
    'assets',
    'resizeImage',
    filename + `-${width}` + `-${height}` + '.jpg',
  );
  return { rawPath, targetPath };
};

/**
 *
 * @param value
 * @returns
 */
function isNumeric(value: string) {
  if (!isNaN(Number(value))) {
    if (parseInt(value) <= 0) {
      return false;
    }
    return true;
  }
  return false;
}

/**
 *
 * @param size
 * @returns
 */
export const checkSize = async (size: string): Promise<boolean> => {
  if (!size || !isNumeric(size)) {
    return false;
  } else {
    return true;
  }
};

/**
 *
 * @param targetPath
 * @returns
 */
export const checkExistFile = async (targetPath: string): Promise<boolean> => {
  if (fs.existsSync(targetPath)) {
    return true;
  } else {
    return false;
  }
};

interface infImage {
  rawPath: string;
  targetPath: string;
  widths: string;
  heights: string;
}
/**
 *
 * @param params
 * @returns
 */
export const processingImage = async (image: infImage): Promise<boolean> => {
  try {
    await sharp(image.rawPath)
      .resize(parseInt(image.widths), parseInt(image.heights))
      .toFormat('jpeg')
      .toFile(image.targetPath);

    const checkFile = await checkExistFile(image.targetPath);
    if (!checkFile) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
