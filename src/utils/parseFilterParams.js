import { contactTypeList, booleanList } from '../constants/contactsConstants.js';

function parseBoolean(value) {
    if (typeof value !== 'string') return;
    if (!booleanList.includes(value)) return;

    const parsedValue = JSON.parse(value);
    return parsedValue;
}

export function parseFilterParams({ type, isFavourite }) {
    const parsedType = contactTypeList.includes(type) ? type : null;
    const parsedFavourite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedFavourite,
    };
}
