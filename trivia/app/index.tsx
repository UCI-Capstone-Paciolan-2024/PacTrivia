import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { registerDevice } from "../services/device";
import getVariable from "./storage/getItem";
import saveVariable from "./storage/saveItem";
import { getLocation } from "../components/getLocation";
import SelectionDropdown from "../components/selectionDropdown";

const Index = () => {
  const router = useRouter();

  const retryParameters: { retry?: number } = useLocalSearchParams();

  console.log(retryParameters);

  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([
    "UC Irvine Anteaters",
    "UCLA Bruins",
  ]);

  useEffect(() => {
    // fetch all teams available
    fetch("https://api.pactrivia.levarga.com/questionManager", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "list_teams",
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        let teamData = data.data;
        // teamData should look like:
        /*
        {
          "UC Irvine Anteaters": 10,
          "UCLA Bruins": 10
        } 
        */
        // convert this object into an array of strings
        let uniqueTeams = Object.keys(teamData);

        setAvailableTeams(uniqueTeams);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleStart = async () => {
    try {
      // get unique id, if we do not have one
      // this is our first time running the game
      if ((await getVariable("userToken")) == null) {
        await registerDevice();
      }
      // we already have a token, we have played before
      // get user ID and location [latitude, longitude]
      const userToken = await getVariable("userToken");
      getLocation();
      const userLocation = await getVariable("location");

      try {
        console.log("start session");
        // create a custom session using the dropdowns
        const numQuestions = 10;
        const currentDate = new Date();
        const currentTimeInMillis = currentDate.getTime();
        const newTimeInMillis = currentTimeInMillis + numQuestions * 30 * 1000;
        const endDate = new Date(newTimeInMillis);
        const override_game = {
          start: new Date().toISOString(),
          end: endDate.toISOString(),
          teams: selectedTeams,
          max_sessions: -1,
          questions_per_session: numQuestions,
        };

        // determine if we want new questions or not
        let retry = true;
        if (!retryParameters.retry || retryParameters.retry === 0) {
          retry = false;
        }
        console.log("retry value:", retry);
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

        if (response.ok) {
          const responseData = await response.json();
          console.log("request success: ", responseData);

          // saving home team and away teams to display later
          await saveVariable("teams", responseData.data.game.team_logos);

          // save total number of questions
          await saveVariable(
            "totalQs",
            responseData.data.game.questions_per_session
          );
        } else {
          const responseData = await response.json();
          console.log(responseData.error);
          if (responseData.error.type === "NoMoreQuestionsError") {
            await saveVariable("userToken", null);
            await handleStart();
          }
        }
      } catch (error) {
        console.log("Error when starting the session: ", error);
      }
    } catch (error) {
      console.log("Error when registering for device: ", error);
    }

    // start trivia page
    router.push("/trivia");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PacTrivia</Text>
      <Text style={styles.description}>
        Answer questions correctly for a chance to win cool perks
      </Text>
      <Text style={styles.title}>Configure Teams</Text>
      <SelectionDropdown
        options={availableTeams}
        onSelection={(selection) => {
          console.log("Selected team: ", selection);
          let currentSelectedTeams = [...selectedTeams];
          currentSelectedTeams[0] = selection;
          setSelectedTeams(currentSelectedTeams);
        }}
      />
      <Text style={styles.description}>VS</Text>
      <SelectionDropdown
        options={availableTeams}
        onSelection={(selection) => {
          console.log("Selected team: ", selection);
          let currentSelectedTeams = [...selectedTeams];
          currentSelectedTeams[1] = selection;
          setSelectedTeams(currentSelectedTeams);
        }}
      />
      <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginVertical: 8,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#ff3621",
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;
