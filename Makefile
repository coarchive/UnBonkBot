run:
	set -o allexport; source .env; set +o allexport
	npm start

authorize:
	xdg-open https://discord.com/oauth2/authorize?client_id=881419024603430922&scope=bot
