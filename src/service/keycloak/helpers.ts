export const isObjectWithValues = (value?: Record<string, unknown>): boolean =>
    value ? Object.values(value).every((value) => value) : false;
