import * as Location from "expo-location"
import saveVariable from "../app/storage/saveItem";
import getVariable from "../app/storage/getItem";

export const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      
      console.log("LOCATION: ", location)
      
      let locationArray = [location.coords.latitude, location.coords.longitude]
      saveVariable("location", locationArray)


    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
}