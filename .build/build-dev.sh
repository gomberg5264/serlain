cp .babelrc-dev ../.src/.babelrc
cd ..
./node_modules/.bin/babel ./.src/ --out-dir ./dist/src/
rm ./.src/.babelrc
cd -
