import storage from "./Storage";

const saveVariable = async (key: string, value: any) => {
  try {
    await storage.save({
      key: key, // Note: Do not use underscore("_") in key!
      data: value,
    });
    // console.log('Variable saved successfully: ', key);
  } catch (error) {
    console.error('Failed to save variable:', error);
  }
};

export default saveVariable;
