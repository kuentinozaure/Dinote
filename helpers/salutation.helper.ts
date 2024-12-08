export const getSalutation = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return "Good Morning 🦖";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon 🦕";
  } else if (hours >= 17 && hours < 21) {
    return "Good Evening 🌋";
  } else {
    return "Good Night🌙";
  }
};
