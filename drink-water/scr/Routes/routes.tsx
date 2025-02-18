import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

// Definição das rotas
type ITabRoutes = {
  Settings: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<ITabRoutes>();

// Componente de Tela Exemplo (Configurações)
const Screen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: generateRandomColorHexadecimal(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{Math.random()}</Text>
    </View>
  );
};

// Função para gerar cores hexadecimais aleatórias
function generateRandomColorHexadecimal() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Componente Principal de Rotas
export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false, // Oculta o header padrão do React Navigation
          tabBarActiveTintColor: "purple", // Cor do ícone ativo
          tabBarInactiveTintColor: "gray", // Cor do ícone inativo
          tabBarStyle: {
            backgroundColor: "#fff", // Cor de fundo da tab bar
            paddingBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => <Icon name="dashboard" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
