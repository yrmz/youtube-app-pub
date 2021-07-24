type Cookie = {
  keyname: string;
  data: {
    key: string;
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    secure?: true;
    samesite?: true;
  };
};

export const setCookie = ({ keyname, data }: Cookie) => {
  document.cookie = Object.entries(data)
    .filter(([_, value]) => value != null)
    .map(
      ([key, value]) =>
        `${key.replace("key", keyname).replace("maxAge", "max-age")}=${value}`
    )
    .join(";");
};

export const getCookie = (key: string): string => {
  const cookie = document.cookie.split(";").find((x) => x.includes(key));
  return cookie?.split("=")[1] || "";
};
