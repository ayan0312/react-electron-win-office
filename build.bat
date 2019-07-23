echo Building...

cd react && yarn && yarn build && cd ../electron && yarn && yarn release
cd ..