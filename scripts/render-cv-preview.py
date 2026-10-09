"""Regenerate the preview when replacing the public PDF. Requires pypdfium2."""
from pathlib import Path
import pypdfium2 as pdfium

root = Path(__file__).resolve().parent.parent
document = pdfium.PdfDocument(str(root / "public/ahsan-qamar-cv.pdf"))
if len(document) != 1:
    raise ValueError("This layout expects a one-page CV. Update CvPage for multiple pages.")
page = document[0]
image = page.render(scale=2.5).to_pil()
image.save(root / "public/images/cv-preview.png", optimize=True)
print(f"Rendered CV preview: {image.size}")
