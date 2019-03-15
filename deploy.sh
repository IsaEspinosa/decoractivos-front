#!/usr/bin/env bash
rm -rf dist
yarn build --prod
echo "Finish dist build generation"
cd dist/decoractivos-front
rm -rf assets/images
aws s3 sync . s3://decoractivos-front/
aws cloudfront create-invalidation --distribution-id E1GUHIZE2F02MK --paths /index.html
cd ..
rm -rf decoractivos-front
