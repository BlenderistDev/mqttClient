#!/bin/sh
cd front
npm run build > /dev/null 2>&1
cd ..
node main.js
