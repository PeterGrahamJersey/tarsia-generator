# Tarsia Puzzle Generator

Allows you to create and print a tarsia style puzzle.
There is a more comprehensive editor available online, but it doesn't seem to support mac.

ToDo:
- Dale advice
  - Directory restructure ✅
  - Remove unneeded service worker ✅
  - Move components to components dir ✅
  - Triangle to own component + restructure ✅
  - Restructure config ✅
  - Class -> function w/ use state ✅
  - Restructure Tarsia Grid to isolate the value lookup logic ✅
  - Use of 'Map' - consider for print triangles and questions
- Sort the text size ✅
- General styling ✅
- Font styling in the pdf export ✅
- Add some other common layouts ✅
  - What should happen to the state when changing format? ✅
- Fixed viewbox for print grid ✅

Extra features
- Randomised order for print out
- Print-out solution sheet
- Distractors (that end up on the outside)
- Save/load functionality

Questions
- CSS hierarchy, how to move icon button style to GridIcon.css
- Where should the icon data be stored?
- Does the data structure make sense?