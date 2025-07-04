import * as ImageManipulator from "expo-image-manipulator";

/**
 * Enhances an image for OCR by resizing and converting to high-quality base64 JPEG.
 *
 * @param uri - The image URI to process.
 * @returns A base64-encoded string suitable for OCR.
 */
export const enhanceImageForOCR = async (uri: string): Promise<string> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1000 } }], // You can adjust width as needed
    {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    }
  );

  if (!result.base64) {
    throw new Error("Image enhancement failed: base64 not returned.");
  }

  return result.base64;
};
