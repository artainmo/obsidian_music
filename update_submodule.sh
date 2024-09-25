git submodule update --remote # Git knows what to update thanks to the .gitmodules file

git add .
git commit -m "Automatically update submodule to latest versions"
git push
