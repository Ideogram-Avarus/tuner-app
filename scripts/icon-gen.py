# Tuner icon generator
# Recreates assets/images PNGs based on a tuning-fork + waves icon.

from PIL import Image, ImageDraw
from pathlib import Path
import math

OUT_DIR = Path('assets/images')
BASE = 1024


def make_gradient(size, top=(25, 160, 255), bottom=(0, 255, 200)):
    w, h = size
    grad = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    for y in range(h):
        t = y / (h - 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        for x in range(w):
            grad.putpixel((x, y), (r, g, b, 255))
    return grad

def arc_cap_center(cx, cy, r, deg, width):
    """
    Returns the center of the cap at the end of an arc stroke.
    Offsets it outward by half the stroke width for perfect alignment.
    """
    ang = math.radians(deg)
    offset_r = r + width / 2  # move outward by half stroke width
    x = cx + offset_r * math.cos(ang)
    y = cy + offset_r * math.sin(ang)
    return x, y

def draw_arc_with_caps(draw, cx, cy, r, start_deg, end_deg, width):
    cap_r = width / 2
    xscale = 0.85

    r_outer = r + cap_r
    r_inner = r - cap_r

    outer_box = [
        cx - r_outer, cy - r_outer, 
        cx + r_outer, cy + r_outer
        ]
    inner_box = [
        cx - r_inner * xscale, cy - r_inner, 
        cx + r_inner * xscale, cy + r_inner
        ]
    draw.pieslice(outer_box, start_deg, end_deg, fill=255)
    draw.pieslice(inner_box, start_deg, end_deg, fill=0)
    for deg in (start_deg, end_deg):
        ang = math.radians(deg)

        x_outer = cx + r_outer * math.cos(ang)
        y_outer = cy + r_outer * math.sin(ang)

        x_inner = cx + r_inner * xscale * math.cos(ang)
        y_inner = cy + r_inner * math.sin(ang)

        x_mid = (x_outer + x_inner) / 2
        y_mid = (y_outer + y_inner) / 2

        dx = x_outer - x_inner
        dy = y_outer - y_inner

        nx = math.cos(ang)
        ny = math.sin(ang)

        cap_r = abs(dx*nx + dy*ny) / 2

        cap_r = cap_r * 1.005

        draw.ellipse([
            x_mid - cap_r, y_mid - cap_r,
            x_mid + cap_r, y_mid + cap_r
        ], fill=255)


def draw_fork_and_waves(size):
    w, h = size
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)

    # ─── Layout constants ───────────────────────────────────────
    center_x = w // 2
    prong_top_y    = int(h * 0.18)
    prong_bottom_y = int(h * 0.50)
    icon_bottom_y  = int(h * 0.82)

    stroke_width   = int(w * 0.085)           # main thickness
    prong_spacing  = int(w * 0.10)            # half-distance between prong centers

    left_prong_x   = center_x - prong_spacing
    right_prong_x  = center_x + prong_spacing

    # ─── Prongs (two vertical lines + rounded tops) ─────────────
    for x in (left_prong_x, right_prong_x):
        # Vertical line
        draw.line(
            [(x, prong_top_y), (x, prong_bottom_y)],
            fill=255, width=stroke_width
        )
        # Rounded top cap
        r = stroke_width // 2
        draw.ellipse(
            [x - r, prong_top_y - r, x + r, prong_top_y + r],
            fill=255
        )

    # ─── Connecting arc at bottom of prongs ─────────────────────
    arc_radius = (right_prong_x - left_prong_x + stroke_width) // 2

    top_x = center_x - arc_radius
    bottom_x = center_x + arc_radius
    top_y = prong_bottom_y - arc_radius
    bottom_y = prong_bottom_y + arc_radius

    arc_bbox = [
        top_x, top_y,
        bottom_x, bottom_y,
    ]
    draw.arc(arc_bbox, start=0, end=180, fill=255, width=stroke_width)

    # ─── Stem (vertical line + rounded ends) ────────────────────
    # Start stem so it touches / slightly overlaps the arc

    stem_top_y   = bottom_y - int(stroke_width * 0.5)
    stem_bottom_y = icon_bottom_y

    draw.line(
        [(center_x, stem_top_y), (center_x, stem_bottom_y)],
        fill=255, width=stroke_width
    )

    r = stroke_width // 2
    # Bottom cap
    draw.ellipse(
        [center_x - r, stem_bottom_y - r, center_x + r, stem_bottom_y + r],
        fill=255
    )


    # ─── Sound waves (two sets of partial arcs) ─────────────────
    wave_center_y     = int(h * 0.50)
    wave_left_center_x  = center_x - int(w * 0.15)
    wave_right_center_x = center_x + int(w * 0.15)
    wave_thickness = stroke_width * 0.5

    for radius in [int(w * 0.26), int(w * 0.16)]:
        draw_arc_with_caps(
            draw,
            wave_left_center_x, wave_center_y,
            radius, 120, 240, wave_thickness
        )
        draw_arc_with_caps(
            draw,
            wave_right_center_x, wave_center_y,
            radius, 300, 60, wave_thickness
        )

    grad = make_gradient((w, h))
    grad.putalpha(mask)
    return grad




def main():
    art = draw_fork_and_waves((BASE, BASE))
    black_bg = Image.new('RGBA', (BASE, BASE), (5, 5, 5, 255))
    icon_full = black_bg.copy()
    icon_full.alpha_composite(art)

    icon_full.save(OUT_DIR / 'icon.png')
    icon_full.save(OUT_DIR / 'splash-icon.png')

    bg = Image.new('RGBA', (512, 512), (5, 5, 5, 255))
    bg.save(OUT_DIR / 'android-icon-background.png')

    fg = art.resize((512, 512), resample=Image.LANCZOS)
    fg.save(OUT_DIR / 'android-icon-foreground.png')

    mask_mono = draw_fork_and_waves((432, 432)).split()[-1]
    white = Image.new('RGBA', (432, 432), (255, 255, 255, 255))
    mono = Image.composite(white, Image.new('RGBA', (432, 432), (0, 0, 0, 0)), mask_mono)
    mono.save(OUT_DIR / 'android-icon-monochrome.png')

    fav = icon_full.resize((48, 48), resample=Image.LANCZOS)
    fav.save(OUT_DIR / 'favicon.png')

    # Replace react logos with the new icon art on black background
    art_small = Image.open(OUT_DIR / 'android-icon-foreground.png')

    black = (5, 5, 5, 255)

    def make_full(size):
        w, h = size
        bg = Image.new('RGBA', (w, h), black)
        scale = int(min(w, h) * 0.85)
        art_scaled = art_small.resize((scale, scale), resample=Image.LANCZOS)
        x = (w - scale) // 2
        y = (h - scale) // 2
        bg.alpha_composite(art_scaled, (x, y))
        return bg

    sizes = {
        'react-logo.png': (100, 100),
        'react-logo@2x.png': (200, 200),
        'react-logo@3x.png': (300, 300),
        'partial-react-logo.png': (518, 316),
    }

    for name, size in sizes.items():
        img = make_full(size)
        img.save(OUT_DIR / name)

    print('done')

if __name__ == '__main__':
    main()
