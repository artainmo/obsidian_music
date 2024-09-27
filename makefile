build: # build to add music files in static javascript website
	cp Obsidian/Obsidian/list,\ music.md site/data/music.md 
	cp Obsidian/Obsidian/list,\ music,\ study.md site/data/study.md
	sed '/const music_file = `/r site/data/music.md' site/script.js > dist/tmp.js
	sed '/const study_file = `/r site/data/study.md' dist/tmp.js > dist/script.js
	rm -rf dist/tmp.js
	cp site/index.html dist/index.html
	cp site/style.css dist/style.css

update: # update obsidian to have latest music files
	git submodule update --remote # Git knows what to update thanks to the .gitmodules file
	git add .
	git commit -m "Automatically update submodule to latest versions"
	git push

.PHONY: build update
