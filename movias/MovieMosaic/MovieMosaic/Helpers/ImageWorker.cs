using System.Drawing.Imaging;
using System.Drawing;

namespace MovieMosaic.Helpers
{
    public class ImageWorker
    {
        public static Bitmap CompressImage(Bitmap originalPic, int maxWidth, int maxHeight, bool watermark = true, bool transperent = false)
        {
            try
            {
                int width = originalPic.Width;
                int height = originalPic.Height;
                int widthDiff = width - maxWidth;
                int heightDiff = height - maxHeight;
                bool doWidthResize = (maxWidth > 0 && width > maxWidth && widthDiff > heightDiff);
                bool doHeightResize = (maxHeight > 0 && height > maxHeight && heightDiff > widthDiff);

                if (doWidthResize || doHeightResize || (width.Equals(height) && widthDiff.Equals(heightDiff)))
                {
                    int iStart;
                    Decimal divider;
                    if (doWidthResize)
                    {
                        iStart = width;
                        divider = Math.Abs((Decimal)iStart / maxWidth);
                        width = maxWidth;
                        height = (int)Math.Round((height / divider));
                    }
                    else
                    {
                        iStart = height;
                        divider = Math.Abs((Decimal)iStart / maxHeight);
                        height = maxHeight;
                        width = (int)Math.Round(width / divider);
                    }
                }
                using (Bitmap outBmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
                {
                    using (Graphics oGraphics = Graphics.FromImage(outBmp))
                    {
                        oGraphics.Clear(Color.White);
                        oGraphics.DrawImage(originalPic, 0, 0, width, height);
                        if (watermark)
                        {

                            using (Image watermarkImage = Image.FromFile(Path.Combine(Directory.GetCurrentDirectory(), "images", "lohika_watermark.png")))
                            using (TextureBrush watermarkBrush = new TextureBrush(watermarkImage))
                            {
                                double imageHeightBrand = Convert.ToDouble(watermarkImage.Height);
                                double imageWidthBrand = Convert.ToDouble(watermarkImage.Width);
                                double ratioBrand = imageWidthBrand / imageHeightBrand;

                                double imageHeightBild = Convert.ToDouble(outBmp.Height);
                                double imageWidthBild = Convert.ToDouble(outBmp.Width);
                                var imageWidthTmpBranding = imageWidthBild * 0.2;
                                var imageHeightTmpBranding = imageWidthTmpBranding / ratioBrand;
                                int imageWidthBranding = Convert.ToInt32(imageWidthTmpBranding); 
                                int imageHeightBranding = Convert.ToInt32(imageHeightTmpBranding);

                                int watermarkX = (int)(imageWidthBild - imageWidthBranding);
                                int watermarkY = (int)(imageHeightBild - imageHeightBranding);
                                oGraphics.DrawImage(watermarkImage,
                                    new Rectangle(watermarkX, watermarkY, imageWidthBranding, imageHeightBranding),
                                    new Rectangle(0, 0, (int)imageWidthBrand, (int)imageHeightBrand),
                                    GraphicsUnit.Pixel);
                            }
                        }
                        if (transperent)
                        {
                            outBmp.MakeTransparent();
                        }

                        return new Bitmap(outBmp);
                    }
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
