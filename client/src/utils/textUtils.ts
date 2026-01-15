import { UserData } from "../types/user";

export const truncateText = (text: string, maxLength: number): string => {
  console.log("text: ", text);

  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export const buildOtherDetailsText = (user: UserData) => {
  // Parse the string fields
  const [companyName, companyTitle, companyDept] = user.company.split(" - ");
  
  return `${user.age}-year-old ${user.gender}, born on ${user.birthDate}. Height ${user.height} cm, weight ${user.weight} kg. 
${user.eyeColor} eyes, ${user.hair} hair. 
Studied at ${user.university}. 
Works as ${companyTitle || "employee"} at ${companyName || user.company} in the ${companyDept || user.team} department. 
Based in ${user.address}.${user.crypto ? ` 
Interested in ${user.crypto}.` : ""}`;
};
