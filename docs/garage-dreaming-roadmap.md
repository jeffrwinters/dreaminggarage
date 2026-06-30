# Garage Dreaming Product Roadmap

Garage Dreaming is a fun, non-commercial inspiration and planning tool for dream garages, man caves, shops, hangars, lake-life toy barns, and hobby buildings.

## Near-Term Priorities

### 1. Realistic Top-Down Objects
Replace simple colored rectangles with recognizable top-down illustrations.

Examples:
- Cars should look like cars.
- Trucks should look like trucks.
- Wake boats and bass boats should look like boats.
- Motorcycles, lifts, toolboxes, table saws, trees, fire pits, and furniture should each have a clear visual identity.

### 2. Layers
Introduce editable layers so users can organize complex designs.

Initial layers:
- Property
- Landscaping
- Building shell
- Doors and windows
- Vehicles
- Shop equipment
- Woodworking
- Rooms and lifestyle
- Dimensions and clearances

Layer features:
- Show/hide layer
- Lock layer
- Send objects forward/backward
- Move object between layers

### 3. Measurements
Add measurement tools for practical planning.

Use cases:
- Measure between two objects.
- Measure wall-to-object clearance.
- Show aisle widths.
- Show lift clearance and walking space.
- Confirm door openings, trailer room, and equipment access.

### 4. Smart Snapping and Alignment
Go beyond grid snapping.

Snap targets:
- Walls
- Centerlines
- Other objects
- Equal spacing
- Object edges
- Door/window wall positions

### 5. Touch Rotation
Add a natural rotate handle so users can rotate objects with finger/mouse movement instead of only using a button.

### 6. Inspiration Mode
Add a gallery of inspirational shops and starter layouts.

Categories:
- Woodshops
- Hangars
- Race shops
- Lake shops
- Barndominiums
- Man caves
- Toy barns

Longer-term goal: allow users to load a layout inspired by a gallery example.

### 7. Footprint Wizard
Create a guided sizing flow.

Questions:
- How many cars?
- Boat or trailer?
- Boat length?
- Lift?
- Woodshop?
- Office?
- Bathroom?
- Golf simulator?
- Bar/lounge?
- Loft or apartment?
- Outdoor patio/firepit?

Output:
- Suggested footprint, such as 40x60 or 50x80.
- Starter layout generated from answers.

### 8. Fit and Clearance Warnings
Warn users when layouts do not work.

Examples:
- Object outside the shop.
- Boat/trailer clearance blocked.
- Lift clearance blocked.
- Table saw infeed/outfeed blocked.
- Door swing or overhead door clearance conflict.

### 9. Day/Night Mode
Add a fun visual mode.

Night mode ideas:
- Garage lights glow.
- Firepit lights up.
- TVs/neon signs turn on.
- Landscape lighting appears.

### 10. Share Links
Allow users to share layouts.

Desired experience:
- Save layout state to a compact share token or backend record.
- Generate a URL that can be posted in forums or text messages.
- Future: remix another user's layout.

### 11. Simple 3D / Isometric Mode
Add a lightweight 3D-ish view that gives users a better feel for the space without becoming CAD software.

Initial implementation:
- Toggle between 2D and 3D.
- Render the shop slab as an isometric platform.
- Render objects as simple extruded blocks.
- Keep editing in 2D first; 3D can initially be preview-only.

Future enhancements:
- Adjustable wall height.
- Garage doors and windows visible on walls.
- Roof/no-roof toggle.
- Camera rotate.
- Export 3D preview image.

### 12. AI Dream Builder
Long-term signature feature.

Prompt example:
> Build me a 50x80 lake shop with room for four cars, two wake boats, a golf simulator, a woodworking shop, a bar, a loft apartment, and a patio with a fire pit.

Output:
- Recommended footprint.
- Generated starter layout.
- Explanation of space tradeoffs.
- Editable design on canvas.

## Current Next Step

Implement **#11 Simple 3D / Isometric Mode** first as a preview toggle inside the current Dreamer canvas.
