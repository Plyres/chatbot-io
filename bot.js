const bots = [
    {
        name: 'Manga bot',
        avatar: './image/mangaBotAvatar.jpg',
        description: 'I will give you information on manga',
        botCommands: {
            'help': '<b>Commands:</b> help, hello, manga mangaName',
            'hello': 'Hello dear manga fan ! Thanks to me, you can find information on mangas',
            'manga': async (mangaName) => {
                const mangaInfo = await fetchMangaInfo(mangaName);
                if (mangaInfo !== null) {
                    return `<b>Title:</b> ${mangaInfo.title}<br><b>Number of tomes:</b> ${mangaInfo.volumes}<br><b>Synopsys:</b> ${mangaInfo.synopsis}`;
                } else{
                    return 'No manga found with that name.';
                }
            }
        }
    },
    {
        name: 'Video game bot',
        avatar: './image/videoGameBotAvatar.png',
        description: 'I will give you information on video games',
        botCommands: {
            'help': '<b>Commands:</b> help, greetings, game gameName',
            'greetings': 'Greetings fellow gamer ! I can give you the name, release date and released platforms of a game',
            'game': async (gameName) => {
                const gameInfo = await fetchGameInfo(gameName);

                if (gameInfo !== null) {
                    return `<b>Name:</b> ${gameInfo.name}<br><b>Release date:</b> ${gameInfo.released}<br><b>Platforms:</b> ${gameInfo.platforms}`;
                } else {
                    return 'No video game found with that name.';
                }
            }
        }
    },
    {
        name: 'Movie bot',
        avatar: './image/movieBotAvatar.png',
        description: 'I will give you information on movies',
        botCommands: {
            'help': '<b>Commands:</b> help, hi, movie movieName',
            'hi': 'Hi there movie enjoyer ! I can give you the name, release date and plot of a film',
            'movie': async (movieTitle) => {
                const response = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=3b181e07`);
                const movieInfo = await response.json();
                if (movieInfo && movieInfo.Response === 'True') {
                    return `<b>Title:</b> ${movieInfo.Title}<br><b>Year</b>: ${movieInfo.Year}<br><b>Plot</b>: ${movieInfo.Plot}`;
                } else {
                    return 'No movie found with that title.';
                }
            }
        }
    }
];