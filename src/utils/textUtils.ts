import { UserData } from "../types/user";

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export const buildOtherDetailsText = (user: UserData) => {
  return `${user.age}-year-old ${user.gender}, born on ${
    user.birthDate
  }. Height ${user.height} cm, weight ${user.weight} kg. 
${
  user.eyeColor
} eyes, ${user.hair.color.toLowerCase()} ${user.hair.type.toLowerCase()} hair. 
Studied at ${user.university}. 
Works as ${user.company.title} at ${user.company.name} in the ${
    user.company.department
  } department. 
Based in ${user.address.city}, ${user.address.state}, ${user.address.country}. 
Interested in ${user.crypto.coin} on the ${user.crypto.network} network.`;
};
