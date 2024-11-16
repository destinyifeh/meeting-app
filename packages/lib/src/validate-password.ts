export const passwordValidator = (password: string) => {
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: {
      message: "capital letters from A to Z",
      validator: password?.match(atLeastOneUppercase),
    },
    lowercase: {
      validator: password?.match(atLeastOneLowercase),
      message: "small letters from a to z",
    },
    number: {
      validator: password?.match(atLeastOneNumeric),
      message: "numbers from 0 to 9",
    },
    specialChar: {
      validator: password?.match(atLeastOneSpecialChar),
      message: "#?!@$%^&*-",
    },
    eightCharsOrGreater: {
      validator: password?.match(eightCharsOrMore),
      message: "eight characters or more",
    },
  };

  return passwordTracker;
};
