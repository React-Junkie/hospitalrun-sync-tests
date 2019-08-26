#!/usr/bin/env bash

quasar build
rm -rf ./docs
mkdir ./docs
cp -R ./dist/spa/* ./docs
git add docs
git commit -m ":package: Update GitHub Page"
git push
