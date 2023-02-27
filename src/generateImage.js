#!/usr/bin/env node

import * as PImage from 'pureimage';
import * as fs from 'fs';

const palette = [
  { default: '#0eb747', dark: '#0B9239', light: '#4AC975' },
  { default: '#0f2c15', dark: '#08200D', light: '#244E2C' },
  { default: '#f8f5ec', dark: '#EEEADE', light: '#FFFDF6' },
  { default: '#e17c6f', dark: '#B46459', light: '#E89E93' },
  { default: '#dfeb8e', dark: '#CBD96D', light: '#E7F0AA' },
  { default: '#764775', dark: '#5E395E', light: '#987598' },
  { default: '#e7bfbe', dark: '#CAA2A1', light: '#EDCFCE' },
];
const defaultDimension = 100;
const color = palette[Math.floor(Math.random() * palette.length)];
const backgroundColor = color.dark;
const foregroundColor = color.light;
const pixelDimension = 20;

function getFlagValue(flag) {
  const flagIndex = process.argv.indexOf(flag);
  const value = flagIndex > -1 ? process.argv[flagIndex + 1] : defaultDimension;
  return value;
}

function calculateDimensions() {
  // eslint-disable-next-line no-shadow
  const width = getFlagValue('-w');
  // eslint-disable-next-line no-shadow
  const height = getFlagValue('-h');
  return { width, height };
}

const { width, height } = calculateDimensions();

const generatedImage = PImage.make(width, height);
const ctx = generatedImage.getContext('2d');

ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, width, height);

let column = 0;
let row = 0;
const rowCount = Math.ceil(height / pixelDimension);

while (row <= rowCount) {
  const y = pixelDimension * row;
  const pixelWidth = pixelDimension;
  const pixelHeight = pixelDimension;

  while (column <= Math.ceil(width / pixelDimension)) {
    const x = pixelDimension * column;

    if (Math.floor(Math.random() * 10) === 9) {
      ctx.fillStyle = foregroundColor;
      ctx.fillRect(x, y, pixelWidth, pixelHeight);
    }
    column += 1;
  }
  column = 0;
  row += 1;
}

PImage.encodePNGToStream(
  generatedImage,
  fs.createWriteStream(`images/${width}x${height}-${color.dark}.png`)
)
  .then(() => {
    console.log('🎉 File created!');
  })
  .catch((e) => {
    console.log('🚩 There was an error');
  });
