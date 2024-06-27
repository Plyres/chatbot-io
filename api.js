async function fetchGameInfo(gameName) {
    const response = await fetch(`https://api.rawg.io/api/games?key=3a42c9ba26a141f38cd04f39319e7f6f&search=${gameName}`);
    const data = await response.json();
    if (data.results.length > 0) {
        const game = data.results[0];
        const platforms = game.platforms.map(platform => platform.platform.name).join(', ');
        return {
            name: game.name,
            released: game.released,
            platforms: platforms,
        };
    } else {
        return null;
    }
}

async function fetchMangaInfo(mangaName) {
    const response = await fetch(`https://api.jikan.moe/v4/manga?q=${mangaName}`);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
        const manga = data.data[0];
        if (manga.volumes != null){
            return {
                title: manga.title,
                volumes: manga.volumes,
                synopsis: manga.synopsis,
            };
        }else{
            return {
                title: manga.title,
                volumes: "Unknown/Manga is not finished",
                synopsis: manga.synopsis,
            };
        }

    } else {
        return null;
    }
}