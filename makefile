build:
	cp Obsidian/Obsidian/list,\ music.md site/data/music.md 
	cp Obsidian/Obsidian/list,\ music,\ study.md site/data/study.md
	sed '/const music_file = `/r site/data/music.md' site/script.js > dist/script.js
	sed '/const study_file = `/r site/data/study.md' dist/script.js > dist/script.js
	cp site/index.html dist/index.html
