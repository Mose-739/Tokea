"""Trim excess transparent/white borders from hero assets."""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install Pillow")
    raise

ASSETS = Path(__file__).resolve().parent.parent / "src" / "assets"

def trim_image(path: Path, threshold: int = 248) -> None:
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    pixels = img.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a < 12:
                continue
            if r >= threshold and g >= threshold and b >= threshold:
                continue
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

    if max_x <= min_x or max_y <= min_y:
        print(f"skip (empty): {path.name}")
        return

    pad = 8
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(w - 1, max_x + pad)
    max_y = min(h - 1, max_y + pad)

    cropped = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    cropped.save(path, optimize=True)
    print(f"trimmed {path.name} -> {cropped.size[0]}x{cropped.size[1]}")


def main() -> None:
    for name in ("hero-matatu.png", "why-tokea.png", "footer-icon.png", "tokea-icon.png"):
        p = ASSETS / name
        if p.exists():
            trim_image(p)


if __name__ == "__main__":
    main()
