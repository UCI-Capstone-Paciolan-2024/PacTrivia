import { View, Text } from "react-native-animatable";
import { StyleSheet } from "react-native";


export default function GameHeader(props: {HomeTeam: string, AwayTeam: string}) {
    return(
        <View style={styles.gameHeader}>
            <View style={styles.teamLeft}>
                <Text>{props.HomeTeam}</Text>
            </View>
            
            <Text style={styles.gameText}>PacTrivia</Text>
            
            <View style={styles.teamRight}>
                <Text>{props.AwayTeam}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    gameHeader: {
        flexDirection: "row",
        justifyContent: 'center', 
        alignItems: "center",
        backgroundColor: 'white',
        height: "12%",
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative', 
        paddingTop: 40, 
       
      },
      teamLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 15, 
        width: '35%', 
        zIndex: 0, 
        marginTop: 40,
        backgroundColor: "transparent",
        fontWeight: "bold",
      },
      teamRight: {
        position: 'absolute',
        right: 0, 
        top: 0,
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingRight: 15,
        width: '35%',
        zIndex: 0, 
        marginTop: 40,
        backgroundColor: "transparent",
        fontWeight: "bold",
      },
      gameText: {
    
        fontWeight: 'bold',
        color: '#989595',
        fontSize: 24,
        zIndex: 1, 
        fontFamily: "",
        
      }
})
