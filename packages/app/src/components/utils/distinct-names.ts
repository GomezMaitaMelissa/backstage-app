export const distinctNames = (names: Array<string>) => {
  // Crear un Set para almacenar solo nombres únicos
  const uniqueNames = [...new Set(names)];
  return uniqueNames;
}
