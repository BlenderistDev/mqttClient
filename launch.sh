#!/bin/sh
cd front
npm run build
cd ..
node main.js
