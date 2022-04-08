const convertArrayDocs = (docs) => {
  const responseData = [];

  docs.forEach(doc => {
    if (doc?.data()) {
      responseData.push(doc.data());
    }
  });

  return responseData;
};

export {
  convertArrayDocs,
}