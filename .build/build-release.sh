cp .babelrc-release ../.src/client/.babelrc
cd ..
./node_modules/.bin/babel ./.src/client/ --out-dir ./dist/client/
rm ./.src/client/.babelrc
cp ./.src/server/* ./dist/server/
cd -
