const adOrder = (orderBy: string): Array<any> => {
  // eslint-disable-next-line prefer-const
  let order: Array<any> = [];
  switch (orderBy) {
    case "createAsc":
      order.push(["createdAt", "ASC"]);
      break;

    case "titleDesc":
      order.push(["title", "DESC"]);
      break;

    case "titleAsc":
      order.push(["title", "ASC"]);
      break;

    default:
      order.push(["createdAt", "DESC"]);
      break;
  }
  return order;
};

export { adOrder };
