export const timeInt = timeStr => {
  return parseInt(timeStr.split(":").join(""));
}

export const timeStr = timeInt => {
  const mins = timeInt % 100;
  const hours = Math.floor(timeInt / 100);
  let minString = mins < 10 ? `0${mins}` : mins.toString();
  let hourString =  hours < 10 ? `0${hours}` : hours.toString();
  return `${hourString}:${minString}`
}

export const minuteToLabel = minute => {
  if(minute[0] === "0"){
    return minute.slice(1) + " AM";
  }
  const minParts = minute.split(":");
  if(minParts[0] === "12"){
    return `${minute} PM`;
  }
  return `${minParts[0] % 12}:${minParts[1]} ${minParts[0] >= 12 ? "PM" : "AM"}`;
}

const monthToStr = {"01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MAY", "06":"JUN", "07":"JUL", "08":"AUG", "09":"SEP", "10": "OCT", "11": "NOV", "12":"DEC"};

export const formatDate = date => {
  const parts = date.split("-"); //date is formatted 2019-03-27
  return `${monthToStr[parts[1]]} ${parts[2]}, ${parts[0]}`;
}