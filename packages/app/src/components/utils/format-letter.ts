//Limite de letras en las siglas
export const formatAcronym = (acronym: string): string => {
    return acronym.slice(0, 3).toUpperCase();
};