const helpers = {
  isValidEmail: function (email) {
    email = helpers.cleanString(email);
    const regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(email);
  },
  isValidPhoneNo: function (phone) {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return !(!phone || regex.test(phone) === false);
  },
  isValidFormatForPassword: function (passwordInputValue) {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = passwordInputValue.length;
    const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
    const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
    const digitsPassword = digitsRegExp.test(passwordInputValue);
    const specialCharPassword = specialCharRegExp.test(passwordInputValue);
    const minLengthPassword = minLengthRegExp.test(passwordInputValue);
    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "Password is empty";
    } else if (
      !uppercasePassword ||
      !lowercasePassword ||
      !digitsPassword ||
      !specialCharPassword ||
      !minLengthPassword
    ) {
      errMsg =
        "Password should be contain at least one uppercase, one lowercase, one digit, one special Characters and minumum 8 characters.";
    } else {
      errMsg = "";
    }
    return errMsg;
  },

  isValidName: function (name) {
    name = helpers.cleanString(name);
    var namePattern = /^[a-zA-Z\s-]+$/;
    if (!namePattern.test(name)) {
      return false;
    }
    return true;
  },

  splitName: function (name = "") {
    const [firstName, ...lastName] = name.split(" ").filter(Boolean);
    return {
      firstName: firstName,
      lastName: lastName.join(" "),
    };
  },

  cleanString: function (input) {
    return input.trim().replace(/\s+/g, " ");
  },

  calculateStepPercent: function (total, current) {
    return `${(current / total) * 100}%`;
  },

  capitalizeFirstLetterOfEachWord: function (str) {
    if (!str) return ""; // Handle empty strings
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join the words back into a single string
  },

  toTitleCase: function (phrase) {
    if (!phrase) return ""; // Handle empty strings
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  getFileType: function (url) {
    const filenameParts = url.split(".");
    const extension = filenameParts[filenameParts.length - 1].toLowerCase(); // Get the file extension and convert it to lowercase

    let type;

    switch (extension) {
      case "pdf":
        type = extension;
        break;
      case "docx":
      case "doc":
        type = "word";
        break;
      case "xls":
      case "xlsx":
        type = "excel";
        break;
      case "mp3":
      case "ogg":
      case "wav":
        type = "audio";
        break;
      case "mp4":
      case "mov":
        type = "video";
        break;
      case "zip":
      case "7z":
      case "rar":
        type = "archive";
        break;
      case "jpg":
      case "jpeg":
      case "png":
        type = "image";
        break;
      default:
        type = "alt";
    }

    return type;
  },

  convertTimestampToDateTime: function (timestamp) {
    // Create a new Date object from the timestamp (milliseconds since Unix epoch)
    const date = new Date(timestamp);
    // Format the date to a readable format (e.g., "YYYY-MM-DD HH:mm:ss")
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    var hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12"; // Adjust hour to 12-hour format

    // Return the formatted string with AM/PM
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  },

  monthArray: function () {
    return {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };
  },

  yearArray: function (minOffset, maxOffset) {
    let thisYear = new Date().getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
      allYears.push(thisYear - x);
    }
    return allYears;
  },

  getRedirectPath: function (steps) {
    const pages = [
      { pade_id: 0, page_path: "/freelancer/next-big-opertunity" },
      { pade_id: 1, page_path: "/freelancer/inital-setup" },
      { pade_id: 2, page_path: "/freelancer/inital-setup" },
      { pade_id: 3, page_path: "/freelancer/inital-setup" },
      { pade_id: 4, page_path: "/freelancer/setup-profile-step-one" },
      { pade_id: 5, page_path: "/freelancer/setup-profile-step-two" },
      { pade_id: 6, page_path: "/freelancer/setup-profile-step-three" },
      { pade_id: 7, page_path: "/freelancer/setup-profile-step-four" },
      { pade_id: 8, page_path: "/freelancer/setup-profile-step-five" },
      { pade_id: 9, page_path: "/freelancer/setup-profile-step-six" },
      { pade_id: 10, page_path: "/freelancer/setup-profile-step-seven" },
      { pade_id: 11, page_path: "/freelancer/setup-profile-step-eight" },
      { pade_id: 12, page_path: "/freelancer/setup-profile-step-nine" },
      { pade_id: 13, page_path: "/freelancer/setup-profile-step-ten" },
    ];

    if (steps?.next_step !== undefined) {
      let page: any = pages.find((page) => page.pade_id === steps.next_step);
      return page.page_path;
    }
    return "/";
  },
  formatDate: function (dateString) {
    const date = new Date(dateString);
    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  },
  validateTitle: function (title, maxLength = 100, maxWordLength = 50) {
    if (!title || title.trim() === "") {
      return "Project title is required.";
    }

    if (title.length > maxLength) {
      return `Title cannot exceed ${maxLength} characters.`;
    }

    const words = title.split(" ");
    for (let word of words) {
      if (word.length > maxWordLength) {
        return `No single word can exceed ${maxWordLength} characters. Word is too long`;
      }
    }

    return true; // Validation passed
  },
};

export default helpers;
