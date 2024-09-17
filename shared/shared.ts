import { DataNoID, Types } from "@/common/types";

export const getNumberFromString = (string: string) => parseInt((string.match(/\d+/) as any)[0]);
export const capitalizeAllWords = (string: string) => string.replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());

export const createXML = (xmlString: string) => { 
  let div = document.createElement(`div`); 
  div.innerHTML = xmlString.trim(); 
  return div.firstChild; 
}

export const genTypeID = (type: Types) => {
  let uuid = generateUniqueID();
  let id = `${type}_${uuid}`;
  return id;
}
  
export const getTimezone = (date: Date) => {
  const timeZoneString = new Intl.DateTimeFormat(undefined, {timeZoneName: `short`}).format(date);
  const match = timeZoneString.match(/\b([A-Z]{3,5})\b/);
  return match ? match[1] : ``;
}

export const generateID = () => {
  let id = Math.random().toString(36).substr(2, 9);
  return Array.from(id).map(char => {
    return Math.random() > 0.5 ? char.toUpperCase() : char;
  }).join(``);
}
  
export const generateUniqueID = (existingIDs?: string[]) => {
  let newID = generateID();
  if (existingIDs && existingIDs.length > 0) {
    while (existingIDs.includes(newID)) {
      newID = generateID();
    }
  }
  return newID;
}
  
export const removeTrailingZeroDecimal = (number: number, decimalPlaces = 1) => {
  let num = typeof number == `string` ? parseFloat(number) : number;
  const wholeNumber = Math.trunc(num);
  const decimalPart = num - wholeNumber;
  if (decimalPart === 0) {
    return wholeNumber;
  } else {
    return num.toFixed(decimalPlaces);
  }
}

export const genID = ({ name = ``, type = Types.Data, index = 1 }: DataNoID) => {
  let uuid = generateUniqueID();
  name = capitalizeAllWords(name);
  let currentDateTimeStamp = formatDate(new Date());
  let currentDateTimeStampNoSpaces = formatDate(new Date(), `timezoneNoSpaces`);
  let id = `${index}_${type}_${name}_${currentDateTimeStampNoSpaces}_${uuid}`;
  let title = `${index} ${name} ${currentDateTimeStamp} ${uuid}`;
  return {
    id,
    name,
    uuid,
    type,
    index,
    title,
    timestamps: {
      currentDateTimeStamp,
      currentDateTimeStampNoSpaces,
    }
  }
}

export const countPropertiesInObject = (obj: any) => {
  let count = 0;
  // Base condition to check if the input is an object
  if (typeof obj === `object` && obj !== null) {
    for (const key in obj) {
      count++; // Count the current key
      count += countPropertiesInObject(obj[key]); // Recursively count keys in nested objects
    }
    // If the object is an array, iterate over its elements
    if (Array.isArray(obj)) {
      obj.forEach(item => {
          count += countPropertiesInObject(item); // Recursively count keys in nested objects within the array
      });
    }
  }
  return count;
}

export const formatDate = (date: any, specificPortion?: any) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? `PM` : `AM`;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour `0` should be `12`
  minutes = minutes < 10 ? `0` + minutes : minutes;
  let strTime = hours + `:` + minutes + ` ` + ampm;
  let strTimeNoSpaces = hours + `-` + minutes + `-` + ampm;
  let completedDate = strTime + ` ` + (date.getMonth() + 1) + `/` + date.getDate() + `/` + date.getFullYear();
  let timezone = getTimezone(date);

  if (specificPortion == `time`) {
    completedDate = strTime;
  } else if (specificPortion == `date`) {
    completedDate = (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear();
  } else if (specificPortion == `timezone`) {
    completedDate = strTime + ` ` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + ` ` + timezone;
  } else if (specificPortion == `timezoneNoSpaces`) {
    completedDate = strTimeNoSpaces + `_` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + `_` + timezone;
  } else {
    completedDate = strTime + ` ` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + ` ` + timezone;
  }

  return completedDate;
}