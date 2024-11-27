import { sortOrderList } from '../constants/constants.js';

export function parseSortParams ({ sortBy, sortOrder }, fieldList) {
    const parsedSortOrder = sortOrderList.includes(sortOrder)
        ? sortOrder
        : sortOrderList[0];
    const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};
