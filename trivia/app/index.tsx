import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  SafeAreaView, Alert,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import getVariable from "./storage/getItem";
import saveVariable from "./storage/saveItem";
import SelectionDropdown from "../components/selectionDropdown";
import { handleSessionStart } from "../services/session_handler";

const Index = () => {
  const router = useRouter();

  const retryParameters: { retry?: number } = useLocalSearchParams();

  console.log(retryParameters);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = async () => {
    setIsDarkMode(previousState => !previousState);
    await saveVariable("darkMode", !isDarkMode);
  }

  const fetchDarkModeValue = async () => {
    const value = await getVariable("darkMode");
    if (value !== null) {
      setIsDarkMode(value);
    } else {
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    fetchDarkModeValue();
  }, []);
    

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
        const data = await response.json();
        if (!response.ok) throw data.error
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
        Alert.alert("Failed to retrieve teams", error.message)
        console.error("Error retrieving teams:", error);
      });
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.darkmodeToggle}>
        <Text style={{ color: "white", padding: 10   }}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#555555" }}
          onValueChange={toggleDarkMode}
          // @ts-expect-error
          activeThumbColor={"white"}
          value={isDarkMode}
        />
      </SafeAreaView>
        <View>
          <Text style={styles.title}>
            <Text style={styles.pac}>Pac</Text>
            <Text style={styles.trivia}>Trivia</Text>
          </Text>
        </View>
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
      <Pressable style={styles.button} onPress={() => {handleSessionStart(selectedTeams, router, false)}}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pac: {
    color: 'white',
  },
  trivia: {
    color: '#ff3621',
  },
  container: {
    flex: 1,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  darkmodeToggle: {
    position: 'absolute',
    top: 30,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
