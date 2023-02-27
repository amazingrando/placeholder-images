![4K-CI-style badge](https://user-images.githubusercontent.com/409903/165123883-03452ea9-76ec-4319-9d82-b2dcba785d2b.svg)

# Four Kitchens Placeholder Image

Dynamically create placeholder images using the Four Kitchens colors and pixel pattern.

## Installation

- Clone this repository.
- `npm i` to install dependencies.

## Usage

- Running `./src/generateImage.js` will create a 100x100 pixel image in the `./images` directory of a random color.
- Adding the `-w` for width and/or `-h` for height flags followed by a number will declare the image's dimensions.

### Examples

- Running `./src/generateImage.js` creates a 100x100px image
- Running `./src/generateImage.js -w 300` creates a 300x100px image
- Running `./src/generateImage.js -h 400` creates a 100x400px image
- Running `./src/generateImage.js -w 1200 -h 1000` creates a 1200x1000px image

## Future features

- [ ] Make this a website that can be used to replace PlaceIMG
- [ ] Add `-r` as a flag for controlling how many pixels show, e.g. `low` and `high`.
- [ ] Name the colors and allow a `-c` flag to call that color.
- [ ] Make this a Figma plugin.
- [ ] Tests.
