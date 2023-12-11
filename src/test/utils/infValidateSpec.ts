import {
  checkSize,
  checkExistFile,
  processingImage,
} from '../../utils/infValidate';
import path from 'path';

describe('Test for infomation validation', () => {
  describe('#checkSize', () => {
    let size;
    it('The size is incorrect', () => {
      size = '-200';
      expect(checkSize(size)).not.toBeFalsy();
    });

    it('The size is correct', () => {
      size = '200';
      expect(checkSize(size)).toBeTruthy();
    });
  });

  describe('#checkExistFile', () => {
    let imagePath;
    it('The image is exist', () => {
      imagePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'rawImage',
        'pikachu.jpg',
      );
      expect(checkExistFile(imagePath)).toBeTruthy();
    });

    it('The image is not exist', () => {
      imagePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'rawImage',
        'pikachu2.jpg',
      );
      expect(checkExistFile(imagePath)).not.toBeFalsy();
    });
  });

  describe('#processingImage', () => {
    let image;
    it('Processing image success', () => {
      image = {
        rawPath: path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'assets',
          'rawImage',
          'pikachu.jpg',
        ),
        targetPath: path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'assets',
          'resizeImage',
          'pikachu-200-200.jpg',
        ),
        widths: '200',
        heights: '200',
      };
      expect(processingImage(image)).toBeTruthy();
    });
  });
});
