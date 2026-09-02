#!/usr/bin/env python3
"""
Generates the loader's single stroke: circle, handwritten name, coiled wire.

The name is authored once, on a straight baseline, as a chain of cubic
beziers in a plain coordinate system (x runs right, y runs up, baseline at
zero). It is then sheared for slant and warped onto the bottom of the ring, so
the baseline becomes the circle itself. The circle arc is drawn from the tail of
the C round to the start of the T, the wire from the tail of the C in to the
handle. Everything is emitted as one path, so one dash offset writes all of it.

Run it after changing any letter. It writes components/loaders/cable.ts and a
standalone preview into the scratchpad, which is much faster to iterate on
than a Next build.

    python3 scripts/loader-path.py
"""
import json, math, os, sys

CENTRE = 160.0
RADIUS = 124.0
SLANT = 0.18          # x += SLANT * y, a modest italic

# Where the artwork sits: must match .loader__art { height } and ART_HEIGHT.
ART_HEIGHT = 0.56 * 320
ART_WIDTH = ART_HEIGHT * 720 / 997
ART_LIFT = 14          # units the artwork sits above centre; matches .loader__art transform
MIC_FOOT = (CENTRE - ART_WIDTH / 2 + 0.5042 * ART_WIDTH,
            CENTRE - ART_HEIGHT / 2 + 0.8907 * ART_HEIGHT - ART_LIFT)

# ---------------------------------------------------------------------------
# The name. One stroke, start to finish. Each entry is a cubic bezier that
# begins where the previous one ended: (c1, c2, end). Units are roughly
# pixels on the 320 box before warping. Cap height 27, x-height 13.
# ---------------------------------------------------------------------------
START = (0.0, 0.0)
LETTERS = [
    # T: stem up off the ring, loop back over the top, crossbar right across it,
    # rounding off into the J rather than cornering.
    ((6, 0), (9, 6), (9, 30)),
    ((9, 36), (0, 38), (-4, 32)),
    ((-5, 30), (14, 32), (32, 32)),
    ((37, 32), (38, 27), (36, 18)),
    # J: down, loop under the line, out along the base.
    ((35, 8), (34, -6), (28, -11)),
    ((21, -13), (19, -4), (24, -1)),
    ((28, 1), (34, 3), (40, 5)),
    # Word space, one long rise into the Y.
    ((45, 8), (49, 18), (52, 28)),
    # Y: left arm down, right arm up, stem below the line with a loop.
    ((53, 20), (57, 14), (61, 14)),
    ((65, 14), (68, 21), (70, 28)),
    ((70, 20), (66, 4), (64, -6)),
    ((63, -11), (57, -11), (57, -6)),
    ((57, -2), (62, 0), (69, 0)),
    # o: up the right, over the top, down the left, out of the side and up.
    ((75, 3), (80, 8), (79, 13)),
    ((78, 17), (69, 17), (68, 10)),
    ((67, 3), (73, -1), (78, 2)),
    ((81, 5), (82, 9), (82, 12)),
    ((83, 15), (85, 16), (87, 16)),
    # u
    ((85, 7), (86, 0), (91, 0)),
    ((95, 0), (96, 5), (96, 15)),
    ((96, 5), (98, 0), (102, 1)),
    # r
    ((105, 4), (107, 10), (108, 15)),
    ((109, 17), (114, 16), (115, 13)),
    ((115, 8), (115, 3), (117, 1)),
    # Word space, rising into the M.
    ((121, 4), (126, 15), (129, 28)),
    # M: three strokes down, two up, the peaks rounded, exit hook.
    ((130, 18), (131, 8), (132, 0)),
    ((134, 10), (138, 26), (141, 28)),
    ((144, 29), (146, 10), (147, 0)),
    ((149, 10), (153, 26), (156, 28)),
    ((159, 29), (161, 10), (162, 0)),
    ((163, -1), (166, -1), (168, 2)),
    # C: up to the top, curl, round the bowl, tail out along the ring.
    ((172, 9), (178, 21), (183, 27)),
    ((185, 33), (175, 34), (172, 27)),
    ((166, 17), (168, 2), (177, 0)),
    ((183, -1), (188, -1), (193, 0)),
]

# ---------------------------------------------------------------------------
def shear(p):
    return (p[0] + SLANT * p[1], p[1])

def length_straight():
    pts = [START] + [seg[2] for seg in LETTERS]
    return shear(pts[-1])[0] - shear(pts[0])[0]

L = length_straight()

def warp(p):
    """Straight (x along the baseline, y inward) to the ring."""
    x, y = shear(p)
    phi = (x - L / 2) / RADIUS               # radians, positive to the right
    angle = math.pi - phi                     # clockwise from twelve o'clock
    r = RADIUS - y
    return (CENTRE + r * math.sin(angle), CENTRE - r * math.cos(angle))

def f(v):
    return f"{v:.2f}"

def pt(p):
    return f"{f(p[0])},{f(p[1])}"

# Endpoints on the ring.
p_t = warp(START)
p_c = warp(LETTERS[-1][2])

# The wire. Leaves the tail of the C along the ring's own direction for a few
# units, so there is no corner at the fork, then coils inward and up to the
# handle. Authored directly in ring space.
def tangent_at(p):
    """Unit tangent of the ring at p, in the direction the light travels."""
    dx, dy = p[0] - CENTRE, p[1] - CENTRE
    n = math.hypot(dx, dy)
    return (dy / n, -dx / n)   # anticlockwise on screen (up the right side)

tx, ty = tangent_at(p_c)

# A short lead off the tail of the C, carrying the ring's own direction for a
# few units so there is no corner at the fork, then rising to where the coil
# begins.
COIL_START = (250.0, 218.0)
LEAD = ((p_c[0] + 8 * tx, p_c[1] + 8 * ty), (254, 240), COIL_START)

# The coil: a circle of radius COIL_R drawn clockwise LOOPS times while its
# centre travels left along the band above the name, which is what a stretched
# cord looks like from the side. Flattened to short lines. It stops short of the
# handle and a last lead takes it into the base from below and to the right.
COIL_R = 7.0
LOOPS = 3
COIL_END = (188.0, 222.0)
COIL_A = (COIL_START[0] - COIL_R, COIL_START[1])
COIL_B = (COIL_END[0] - COIL_R, COIL_END[1])
COIL_STEPS = 32 * LOOPS

def coil_point(i):
    t = 2 * math.pi * LOOPS * i / COIL_STEPS
    k = i / COIL_STEPS
    cx = COIL_A[0] + (COIL_B[0] - COIL_A[0]) * k
    cy = COIL_A[1] + (COIL_B[1] - COIL_A[1]) * k
    return (cx + COIL_R * math.cos(t), cy - COIL_R * math.sin(t))

TAIL_IN = ((180, 227), (168, 226), MIC_FOOT)

COIL = [coil_point(i) for i in range(1, COIL_STEPS + 1)]

# ---------------------------------------------------------------------------
# Assemble the path.
d = [f"M {pt(p_c)}"]
# Big arc, anticlockwise, from the tail of the C round to the start of the T.
d.append(f"A {f(RADIUS)},{f(RADIUS)} 0 1,0 {pt(p_t)}")
for c1, c2, e in LETTERS:
    d.append(f"C {pt(warp(c1))} {pt(warp(c2))} {pt(warp(e))}")
d.append(f"C {pt(LEAD[0])} {pt(LEAD[1])} {pt(LEAD[2])}")
d.append("L " + " ".join(pt(q) for q in COIL))
d.append(f"C {pt(TAIL_IN[0])} {pt(TAIL_IN[1])} {pt(TAIL_IN[2])}")
PATH = " ".join(d)

# ---------------------------------------------------------------------------
# Lengths, so the animation can spend a different amount of time on each part.
def bez_len(p0, c1, c2, p1, n=40):
    tot, prev = 0.0, p0
    for i in range(1, n + 1):
        t = i / n
        u = 1 - t
        x = u**3*p0[0] + 3*u*u*t*c1[0] + 3*u*t*t*c2[0] + t**3*p1[0]
        y = u**3*p0[1] + 3*u*u*t*c1[1] + 3*u*t*t*c2[1] + t**3*p1[1]
        tot += math.hypot(x - prev[0], y - prev[1]); prev = (x, y)
    return tot

def ring_angle(p):
    return math.degrees(math.atan2(p[0] - CENTRE, CENTRE - p[1])) % 360

# Arc length: from p_c anticlockwise (decreasing angle) to p_t.
a_c, a_t = ring_angle(p_c), ring_angle(p_t)
sweep = (a_c - a_t) % 360
arc_len = RADIUS * math.radians(sweep)

letters_len, prev = 0.0, p_t
for c1, c2, e in LETTERS:
    q = (warp(c1), warp(c2), warp(e))
    letters_len += bez_len(prev, *q); prev = q[2]

wire_len = bez_len(p_c, *LEAD)
prev = COIL_START
for q in COIL:
    wire_len += math.hypot(q[0] - prev[0], q[1] - prev[1]); prev = q
wire_len += bez_len(COIL_END, *TAIL_IN)

total = arc_len + letters_len + wire_len
fractions = {
    "circle": arc_len / total,
    "letters": letters_len / total,
    "wire": wire_len / total,
}

# ---------------------------------------------------------------------------
out = os.path.join(os.path.dirname(__file__), "..", "components", "loaders", "cable.ts")
with open(out, "w") as fh:
    fh.write("/* Generated by scripts/loader-path.py. Edit the letters there, not here. */\n\n")
    fh.write(f"export const CABLE_PATH =\n  {json.dumps(PATH)};\n\n")
    fh.write("/** Where each part of the run starts and ends, as a fraction of the whole. */\n")
    fh.write("export const CABLE_PARTS = {\n")
    fh.write(f"  circleEnd: {fractions['circle']:.4f},\n")
    fh.write(f"  lettersEnd: {fractions['circle'] + fractions['letters']:.4f},\n")
    fh.write("} as const;\n\n")
    fh.write(f"/** The base of the handle, where the wire plugs in. */\n")
    fh.write(f"export const MIC_FOOT = {{ x: {MIC_FOOT[0]:.2f}, y: {MIC_FOOT[1]:.2f} }};\n")

scratch = sys.argv[1] if len(sys.argv) > 1 else None
if scratch:
    with open(scratch, "w") as fh:
        fh.write(f"""<!doctype html><meta charset=utf-8>
<body style="margin:0;background:#141018;display:grid;place-items:center;height:100vh">
<svg viewBox="0 0 320 320" width="800" height="800" style="overflow:visible">
  <rect x="{CENTRE-ART_WIDTH/2:.1f}" y="{CENTRE-ART_HEIGHT/2-ART_LIFT:.1f}" width="{ART_WIDTH:.1f}" height="{ART_HEIGHT:.1f}" fill="none" stroke="#3a3040" stroke-dasharray="2 2"/>
  <circle cx="{MIC_FOOT[0]:.1f}" cy="{MIC_FOOT[1]:.1f}" r="2" fill="#ff2d55"/>
  <path d="{PATH}" fill="none" stroke="#F5F0EA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>
  <path d="{PATH}" fill="none" stroke="#F2A65A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="{1000*(1-fractions['circle']-fractions['letters']):.0f}"/>
  <circle cx="{p_t[0]:.1f}" cy="{p_t[1]:.1f}" r="1.6" fill="#2dff88"/>
  <circle cx="{p_c[0]:.1f}" cy="{p_c[1]:.1f}" r="1.6" fill="#4d9fff"/>
</svg>
""")

print(f"straight length {L:.1f}  arc {arc_len:.0f}  letters {letters_len:.0f}  wire {wire_len:.0f}  total {total:.0f}")
print(f"T starts at {p_t[0]:.1f},{p_t[1]:.1f} ({ring_angle(p_t):.0f}deg)   C ends at {p_c[0]:.1f},{p_c[1]:.1f} ({ring_angle(p_c):.0f}deg)")
print(f"fractions {json.dumps({k: round(v,3) for k,v in fractions.items()})}")
