export function getUserInfo(key: string): string | undefined {
  const authtoken = localStorage.getItem("token");

  if (authtoken) {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        switch (key) {
          case "user_image":
            return user.profile_image_path;
          case "id":
            return user.id;
          case "fullname":
            return user.name + " " + user.last_name;
          case "email":
            return user.email;
          case "role":
            return user.role;
          case "verified":
            return user.verified;
          case "role_name":
            return user.role_name;
          default:
            console.warn(`Unknown key requested: ${key}`);
            return undefined;
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        return undefined;
      }
    }
  }

  return ""; // Return an empty string if no token or user data exists
}
