import { Response } from 'express';
import path from 'path';
import {
  getImagePath,
  checkExistFile,
  checkSize,
  processingImage,
} from '../utils/infValidate';

/**
 *ß
 * @param req
 * @param res
 * @returns
 */
const resizeImages = async (req: any, res: Response) => {
  const filename: string = req.query.filename;
  const widths: string = req.query.width;
  const heights: string = req.query.height;

  if (!(await checkSize(widths)) || !(await checkSize(heights))) {
    return res.status(400).json({ error: 'Width or height is incorrect.' });
  }

  if (filename && !widths && !heights) {
    return res.sendFile(
      path.resolve(
        __dirname,
        '..',
        '..',
        'assets',
        'rawImage',
        `${filename}.jpg`,
      ),
    );
  } else if (!filename || !widths || !heights) {
    return res
      .status(400)
      .json({ error: 'Missing filename, height, or width.' });
  }

  const { rawPath, targetPath } = await getImagePath(
    filename,
    req.query.width,
    req.query.height,
  );

  if ((await checkExistFile(rawPath)) === false) {
    return res.status(400).json({ error: 'Image not exist.' });
  }

  const params = {
    rawPath: rawPath,
    targetPath: targetPath,
    widths: widths,
    heights: heights,
  };

  if ((await checkExistFile(targetPath)) === true) {
    return res.status(200).sendFile(params.targetPath);
  }

  const result = await processingImage(params);
  if (result) {
    return res.status(200).sendFile(params.targetPath);
  }
  return res.status(400).json({ error: 'Resize image fail.' });
};

export default resizeImages;
