#!/usr/bin/env node

import * as PImage from "pureimage"
import * as fs from 'fs'
import palette from "./colors.json" assert {type: 'json'};

const defaultDimension = 100;
const color = palette.colors[Math.floor(Math.random() * palette.colors.length)];
const backgroundColor = color.dark;
const foregroundColor = color.light;

function getFlagValue(flag) {
  const flagIndex = process.argv.indexOf(flag);
  const value = flagIndex > -1 ? process.argv[flagIndex + 1] : defaultDimension;
  return value;
}

function calculateDimensions() {
  const width = getFlagValue('-w');
  const height = getFlagValue('-h');
  return {width, height};
}

const { width, height } = calculateDimensions();

const pixelSize = width / 16;
const generatedImage = PImage.make(width, height)
const ctx = generatedImage.getContext('2d');

ctx.fillStyle = backgroundColor;
ctx.fillRect(0,0,width,100);

let column = 0;
let row = 0;
const rowCount = Math.ceil(height / 16);

while (row <= rowCount) {
  const y = pixelSize * row;
  const pixelWidth = pixelSize;
  const pixelHeight = pixelSize;
  
  while (column <= 16) {
    const x = pixelSize * column;

    if ((Math.floor(Math.random() * 6)) == 5) {
      ctx.fillStyle = foregroundColor;
      ctx.fillRect(x, y, pixelWidth, pixelHeight);
    }
    column++;
  }
  column = 0;
  row++
}

PImage.encodePNGToStream(generatedImage, fs.createWriteStream(`images/${width}x${height}-${backgroundColor.default}.png`)).then(() => {
  console.log("wrote out the png file to out.png");
}).catch((e)=>{
  console.log("there was an error writing");
});