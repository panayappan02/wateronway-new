const convertToddmmyy = oTime => {
  const month =
    (oTime?.toDate().getMonth() + 1).toString().length === 1
      ? `0${(oTime.toDate().getMonth() + 1).toString()}`
      : `${(oTime.toDate().getMonth() + 1).toString()}`;

  const date =
    oTime?.toDate().getDate().toString().length === 1
      ? `0${oTime.toDate().getDate().toString()}`
      : `${oTime.toDate().getDate().toString()}`;
  const year = oTime?.toDate().getFullYear().toString();

  return `${date}/${month}/${year}`;
};

export {convertToddmmyy};
