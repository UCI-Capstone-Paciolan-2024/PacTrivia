// sessionHandler.tsx
import { Alert } from 'react-native';
import { registerDevice } from "../services/device";
import getVariable from "../app/storage/getItem";
import saveVariable from "../app/storage/saveItem";
import { getLocation } from "../components/getLocation";

export const handleSessionStart = async (selectedTeams: string[], router: any, retry: boolean) => {
  try {
    if ((await getVariable("userToken")) == null) {
      await registerDevice();
    }
    const userToken = await getVariable("userToken");
    getLocation();
    const userLocation = await getVariable("location");

    try {
      console.log("start session");
      const numQuestions = 10;
      const currentDate = new Date();
      const currentTimeInMillis = currentDate.getTime();
      const oneHourInMillis = 60 * 60 * 1000; 
      const newTimeInMillis = currentTimeInMillis + oneHourInMillis;
      const endDate = new Date(newTimeInMillis);
      const override_game = {
        start: new Date().toISOString(),
        end: endDate.toISOString(),
        teams: selectedTeams,
        max_sessions: -1,
        questions_per_session: numQuestions,
      };

      console.log("override_game: ", override_game);
      const response = await fetch(
        `https://api.pactrivia.levarga.com/startSession`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: userToken,
            userLocation: userLocation,
            retry: retry,
            override_game: override_game,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) throw responseData.error;
      console.log("request success: ", responseData);
      
      // saving home team and away teams to display later
      await saveVariable("teams", responseData.data.game.team_logos);

      // save total number of questions
      await saveVariable(
        "totalQs",
        responseData.data.game.questions_per_session
      );

      // start trivia page
      router.push({
        pathname: '/trivia',
        params: { selectedTeams: JSON.stringify(selectedTeams) },
      });
      
    } catch (error: any) {
      console.log("Error when starting the session: ", error);
      if (error.type === "NoMoreQuestionsError") {
        console.log("removing saved token");
        await saveVariable("userToken", null);
        await handleSessionStart(selectedTeams, router, false);
      } else {
        Alert.alert("Error starting session", error.message);
      }
    }
  } catch (error: any) {
    Alert.alert("Failed to register", error.message);
    console.log("Error when registering for device: ", error);
  }
};
