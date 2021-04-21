import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { EnviromentButton } from "../components/EnvironmentButton";

import { Header } from "../components/Header";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import api from "../services/api";

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [enviroments, setEnvirtoments] = useState<EnviromentProps[]>([]);

  useEffect(() => {
    async function getEnviroment() {
      const { data } = await api.get('plants_environments');
      setEnvirtoments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }
    
    getEnviroment();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          renderItem={({ item }) => <EnviromentButton title={item.title}  />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  }
});
