export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const generateRandomBirthDate = (): string => {
  const year = Math.floor(1960 + Math.random() * 45);
  const month = Math.floor(1 + Math.random() * 12);
  const day = Math.floor(1 + Math.random() * 28);

  return `${month}/${day}/${year}`;
};
