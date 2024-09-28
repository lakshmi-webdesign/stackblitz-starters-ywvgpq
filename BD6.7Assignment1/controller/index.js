let theatres = [
    { theatreId: 1, name: 'Regal Cinemas', location: 'Downtown' },
    { theatreId: 2, name: 'AMC Theatres', location: 'Midtown' },
    { theatreId: 3, name: 'Cinemark', location: 'Uptown' },
];

let shows = [
    { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
    { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
    { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
    { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' },
];

function getAllShows() {
    return shows;
}

function getShowById(id) {
    return shows.find((obj) => obj.showId === id)
}

function validateShow(data) {
    if (!data.title || typeof data.title !== "string") {
        return "Title is required and should be string"
    }

    if (!data.theatreId || typeof data.theatreId !== "number") {
        return "TheatreId is required should be number";
    }

    if (!data.time || typeof data.time !== "string") {
        return "Time is required and should be string"
    }

    return null;
}

module.exports = { shows, getAllShows, getShowById, validateShow }