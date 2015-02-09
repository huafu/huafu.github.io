#!/bin/sh
cd "$(dirname $0)" && \
rm -rf gh-pages/* && \
ember b -prod && \
cp -R dist/* gh-pages/ && \
cd gh-pages && \
git add -A && \
git commit -m "Update of GitHub pages" && \
git push origin master
