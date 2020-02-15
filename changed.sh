#!/bin/bash

CHANGED=$(npm run lerna -- changed)

for PROJECT in $CHANGED; do
  echo $PROJECT
done
