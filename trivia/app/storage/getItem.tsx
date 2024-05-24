import storage from "./Storage";

const getVariable = async (key:string) => {
  try {
    const value = await storage.load({
      key: key,
    });
    console.log('Variable retrieved successfully:', value);
    return value;
  } catch (error) {
    console.error('Failed to retrieve variable:', error);
    return null;
  }
};

export default getVariable;
