class ObjectHelper {
  static notAnEmptyObject(obj) {
    return obj && Object.entries(obj).length && obj.constructor === Object;
  }

  // Filter all falsy values ( "", 0, false, null, undefined )
  static filterEmptyVal(obj) {
    return Object.entries(obj)
      .reduce((a, [k, v]) => (v ? { ...a, [k]: v } : a), {});
  }

  static hasUndefinedProperty(obj) {
    const any = Object.entries(obj).find(([k]) => obj[k] === undefined);
    return !!any;
  }

  static getAge(birthDate) {
    return birthDate
      && Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
  }

  static filterObject(obj, query) {
    const filteredVal = obj.filter(query);
    return filteredVal;
  }

  static addDaysToCurrentDate(currDate, noOfDays) {
    const dateObj = new Date(currDate.getTime() + (noOfDays * 24 * 60 * 60 * 1000));
    return dateObj.toISOString();
  }

  static areObjectEqual(a, b) {
    if (!a || !b) {
      return false;
    }

    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  }
}


module.exports = ObjectHelper;
