import { sortOrderList, sortByList } from '../constants/constants.js';

export function parseSortParams ({ sortBy, sortOrder }) {
    const parsedSortOrder = sortOrderList.includes(sortOrder)
        ? sortOrder
        : sortOrderList[0];
    const parsedSortBy = sortByList.includes(sortBy) ? sortBy : 'name';

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};
