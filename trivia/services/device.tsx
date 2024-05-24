import { getUniqueId } from 'react-native-device-info';
import { fetch } from 'cross-fetch';
import DeviceInfo from 'react-native-device-info';
import saveVariable from '../app/storage/saveItem';

const API_URL = 'https://api.pactrivia.levarga.com';

export const registerDevice = async () => {
 try {
    const deviceId = await DeviceInfo.getUniqueId();
    console.log("DEVICE ID: ", deviceId);//TESTING

    const response = await fetch(`${API_URL}/regDevice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
      },
      body: JSON.stringify({ "deviceID": deviceId }),
    });
    
    if (response.ok) {
      const responseData = await response.json();
      console.log("Request success: ", responseData)
      
      // store deviceID
      await saveVariable('userToken', responseData.data["token"])

      return responseData;
    }
    throw new Error(`HTTP error: ${response.status}`)
 } catch (error) {
    console.error(`Failed to register device: ${error}`)
 }
}
