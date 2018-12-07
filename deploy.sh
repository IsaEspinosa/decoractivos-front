#!/usr/bin/env bash
rm -rf dist
yarn build --prod
echo "Finish dist build generation"
cd dist/decoractivos-front
find * -type f -exec chmod 644 {} \;
find * -type d -exec chmod 755 {} \;
echo "Finish file permissions assingment"
zip -q -r ../$(date +%s).zip *
cd ..
rm -rf decoractivos-front
