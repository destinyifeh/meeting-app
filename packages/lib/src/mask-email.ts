export const maskEmail = (email: string, showEmail: boolean) => {
  if (showEmail) {
    return email;
  } else {
    const [name, domain] = email.split("@");

    if (!name) {
      return "";
    }

    const len = name.length;
    const maskedName = name[0]?.slice(0, 2) + "***" + name[len - 1];

    const maskDomainArr = domain?.split(".com");

    const maskDomain = maskDomainArr?.[0]?.slice(0, 1) + "***";

    const maskedEmail = maskedName + "@" + maskDomain + ".com";
    return maskedEmail;
  }
};
