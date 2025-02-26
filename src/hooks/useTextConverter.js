export const useTextConverter = (value, name = "base") => {
  if (value === "" || value === undefined) return "";

  if (name === "base") {
    return value
      .split(",")
      .map((el) => {
        if (el.trim().length === 3) {
          return el.trim().toUpperCase();
        } else {
          let first = el.trim()[0].toUpperCase();
          let next = el.trim().slice(1).toLowerCase();
          return first + next;
        }
      })
      .join(", ");
  }

  if (name === "name") {
    return value
      .split(",")
      .map((el) => {
        return el
          .trim()
          .split(" ")
          .map((el) => {
            let first = el.trim()[0].toUpperCase();
            let next = el.trim().slice(1).toLowerCase();
            return first + next;
          })
          .join(" ");
      })
      .join(", ");
  }
};
