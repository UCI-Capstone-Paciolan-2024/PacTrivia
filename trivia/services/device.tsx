import { getUniqueId } from 'react-native-device-info';
import { fetch } from 'cross-fetch';

const API_URL = 'test';

export const registerDevice = async () => {
 try {
    const deviceId = await getUniqueId();
    const response = await fetch(`${API_URL}/regDevice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId }),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`HTTP error: ${response.status}`)
 } catch (error) {
    console.error(`Failed to register device: ${error}`)
 }
}
