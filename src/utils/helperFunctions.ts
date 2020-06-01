export const sortAndFilterShows = (shows: Array<{[key: string]: any}>): Array<{[key: string]: any}> => {
    // Sorting it
    // # by year >= 2010
    shows = shows.filter(s => s.releaseYear >= 2010);
    // # by AlphaNumeric
    shows = [...shows].sort(function (a, b) {
        if (a.title === b.title) {
            return 0;
        }
        if (typeof a.title === typeof b.title) {
            return a.title < b.title ? -1 : 1;
        }
        return typeof a.title < typeof b.title ? -1 : 1;
    });
    // # filter out every element above 21
    shows = shows.filter((s, i) => i < 21);

    return shows;
};