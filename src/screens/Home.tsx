import React, { useState, useEffect, FC } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { Text, useTheme, TextInput, Button } from "react-native-paper";

import Autocomplete from "react-native-autocomplete-input";

import { FontAwesome5 } from "@expo/vector-icons";

import city from "../../data/cities.json";
import travelCities from "../../data/cheap_trip_travel_data.json";

export interface Item {
  name: string;
}

export const Home: FC = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  // const [cities, setCities] = useState(city);
  const [hideFromCity, setHideFromCity] = useState(true);
  const [hideToCity, setHideToCity] = useState(true);
  const theme = useTheme();

  const filtredCities = (fromCity: string) => {
    if (fromCity) {
      const cities = city.cities.filter((item: { name: string }) => {
        const name = item.name;
        if (name === undefined) return;
        return name.toLowerCase().indexOf(fromCity.toLowerCase()) === 0;
      });
      return cities;
    }
    return [];
  };

  const dataForCity = filtredCities(fromCity);

  const filtredCitiesTravel = Object.values(travelCities).filter((item) => {
    if (dataForCity.length) {
      return item.from === +dataForCity[0].ID;
    }
    return;
  });

  const travelCitiesTo = city.cities.filter((city) =>
    filtredCitiesTravel.find((item) => item.to === +city.ID)
  );
  console.log(travelCitiesTo);
  console.log(filtredCitiesTravel);
  // const dataToCity = filtredCities(toCity);

  const filtredCitiesTo = (toCity: string) => {
    if (toCity) {
      const cities = travelCitiesTo.filter((item: { name: string }) => {
        const name = item.name;
        if (name === undefined) return;
        return name.toLowerCase().indexOf(toCity.toLowerCase()) === 0;
      });
      return cities;
    }
    return [];
  };

  const dataToCity = filtredCitiesTo(toCity);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const getCities = await fetch(
  //         "https://graphproject-482d9-default-rtdb.europe-west1.firebasedatabase.app/locations.json"
  //       );
  //       const responseData = await getCities.json();

  //       await setCities(responseData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // const renderItems = ({ item }: { item: Item }) => <Text>{item.name}</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            ...styles.title,
            color: theme.colors.secondary,
          }}
          variant="titleMedium"
        >
          Find most beneficial and unusual routes between cities with airports,
          combining flight, train, bus, ferry and rideshare.
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            containerStyle={{
              width: "100%",
              backgroundColor: "tomato",
            }}
            listContainerStyle={{}}
            listStyle={{}}
            hideResults={hideFromCity}
            data={dataForCity}
            value={fromCity}
            onChangeText={(text: string) => {
              setFromCity(text), setHideFromCity(false);
            }}
            flatListProps={{
              keyExtractor: (_: any, idx: any) => idx,
              renderItem: ({ item }: { item: Item }) => (
                <Text
                  onPress={() => {
                    setFromCity(item.name);
                    setHideFromCity(true);
                  }}
                  style={styles.autocompleteText}
                >
                  {item.name}
                </Text>
              ),
            }}
          />

          <FontAwesome5
            style={styles.iconArrow}
            name="angle-double-down"
            size={24}
            color={`${theme.colors.primary}`}
          />
          <Autocomplete
            containerStyle={{
              width: "100%",
              backgroundColor: "tomato",
            }}
            listContainerStyle={{}}
            listStyle={{}}
            hideResults={hideToCity}
            data={dataToCity}
            value={toCity}
            onChangeText={(text: string) => {
              setToCity(text), setHideToCity(false);
            }}
            flatListProps={{
              keyExtractor: (_: any, idx: any) => idx,
              renderItem: ({ item }: { item: Item }) => (
                <Text
                  onPress={() => {
                    setToCity(item.name);
                    setHideToCity(true);
                  }}
                  style={styles.autocompleteText}
                >
                  {item.name}
                </Text>
              ),
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="delete"
          mode="elevated"
          onPress={() => {
            setFromCity(""), setToCity("");
          }}
        >
          Clear
        </Button>
        <Button
          icon="car"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Let`s go
        </Button>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/image/Logo_ChT_2.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
  mainContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
  iconArrow: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    ...Platform.select({
      android: {
        marginTop: 130,
      },
    }),
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",

    resizeMode: "contain",
  },
  autocompleteContainer: {
    width: "100%",
    alignItems: "center",
    ...Platform.select({
      android: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
      },
    }),
  },
  autocompleteText: {
    fontSize: 26,
  },
});
