import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { registerDevice } from "../services/device";
import getVariable from "./storage/getItem";
import saveVariable from "./storage/saveItem";
import { getLocation } from "../components/getLocation";
import SelectionDropdown from "../components/selectionDropdown";

const Index = () => {
  const navigate = useNavigation();
  const router = useRouter();

  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(["", ""]);

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
            }),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("request success: ", responseData);

          // saving home team and away teams to display later
          await saveVariable("teams", responseData.data.game.teams);

          // save total number of questions
          await saveVariable(
            "totalQs",
            responseData.data.game.questions_per_session
          );
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
  },
  button: {
    backgroundColor: "red",
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
