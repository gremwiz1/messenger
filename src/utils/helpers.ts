import { BaseUrlAvatar } from "./const";
import { IUserModel } from "./types";

type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }
    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }
  return lhs;
}

export function isEqual(obj1: unknown, obj2: unknown) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}

const avatar = "../../static/logo.png";
export function setAvatarPath(path?: string): string {
  return path ? `${BaseUrlAvatar}${path}` : avatar;
}

export function checkAvatarPath(user: IUserModel) {
  return Object.assign({}, user, {
    avatar: setAvatarPath(user.avatar),
  });
}

export function setTime(data: string) {
  const now = new Date();
  const date = new Date(data.substring(0, 10));
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  if (diffInDays < 1) {
    return data.substr(11, 5);
  } else if (diffInDays == 1) {
    return "Вчера";
  } else if (diffInDays == 2) {
    return "Позавчера";
  } else {
    return data.substring(0, 10);
  }
}
