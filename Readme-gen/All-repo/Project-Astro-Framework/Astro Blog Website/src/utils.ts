function formatDate(date : Date){
    const options : Intl.DateTimeFormatOptions = {
        year : 'numeric',
        month : 'long',
        day : 'numeric',
    }

    return new Date(date).toLocaleDateString(undefined, options);
}

function capitalize(str : string){
    if(typeof str !== 'string' || str.length === 0) 
        return str;

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDate, capitalize };