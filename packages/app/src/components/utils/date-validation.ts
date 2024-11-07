/**
 * Valida que la fecha de fin no exceda tres meses desde la fecha de inicio.
 * @param startDate 
 * @param endDate 
 * @returns
 */
export const validateDateRange = (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) return true;

    const start = new Date(startDate);
    const maxEndDate = new Date(startDate);
    maxEndDate.setMonth(start.getMonth() + 3);

    return new Date(endDate) <= maxEndDate;
};