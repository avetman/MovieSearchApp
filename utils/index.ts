export const formatDateString = (date_string, options) => {
    const date = new Date(date_string);

    return date.toLocaleDateString('en-US', options);
}
export const imageUri = {
    low: `https://image.tmdb.org/t/p/w92`,
    norm: `https://image.tmdb.org/t/p/w342`,
}
export const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}
export const findJob = (credits, Job) => {
    const directorMember = credits?.crew.find(
        (member) => member.job === Job
    );
    if (directorMember) {
        return directorMember.name;
    }
    return null;
};

export const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const ratingList = (rating) => {
    if (rating >= 7.0) {
        return 'rgba(117, 255, 80, 0.6)';
    } else if (rating >= 5.0 && rating < 7.0) {
        return 'rgba(159,153,153,0.6)';
    } else {
        return 'rgba(227, 27, 27, 0.6)';
    }
}