import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Box, Button, Divider, View, Input, Slider, Text, useToast, VStack, HStack } from "native-base";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../contexts/fireBaseConfig";
import { UserContext } from "../contexts/UserContext";

export const ProfileScreen: React.FC = () => {
  const toast = useToast();
  const userContext = useContext(UserContext);

  if (!userContext) {
    console.error("Erro: UserContext não foi encontrado.");
    return null;
  }

  const { user, goal, setGoal } = userContext;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (userContext) {
        userContext.user = currentUser;
      }
    });
    return () => unsubscribe();
  }, [userContext]);

  const handleCreateAccount = async () => {
    if (!email || !password) {
      toast.show({ description: "Preencha todos os campos" });
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.show({ description: "Conta criada com sucesso!", placement: "top" });
    } catch (error) {
      toast.show({ description: "Erro ao criar conta. Verifique os dados.", placement: "top" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.show({ description: "Preencha todos os campos" });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.show({ description: "Login realizado!", placement: "top" });
    } catch (error) {
      toast.show({ description: "Erro ao fazer login. Verifique suas credenciais.", placement: "top" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.show({ description: "Logout realizado!", placement: "top" });
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.show({ description: "Erro ao fazer logout.", placement: "top" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <View style={styles.authContainer}>
          <Text style={styles.welcomeText}>Bem-vindo</Text>
          <VStack space={4} width="100%">
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              variant="filled"
              bg="gray.100"
              borderRadius="md"
              p={3}
            />
            <Input
              value={password}
              onChangeText={setPassword}
              type="password"
              placeholder="Senha"
              secureTextEntry
              variant="filled"
              bg="gray.100"
              borderRadius="md"
              p={3}
            />
            <Button
              onPress={handleCreateAccount}
              isLoading={loading}
              colorScheme="blue"
              _text={{ fontWeight: "bold" }}
              borderRadius="md"
              p={3}
            >
              Criar Conta
            </Button>
            <Button
              onPress={handleLogin}
              isLoading={loading}
              colorScheme="green"
              _text={{ fontWeight: "bold" }}
              borderRadius="md"
              p={3}
            >
              Login
            </Button>
          </VStack>
        </View>
      ) : (
        <View style={styles.profileContainer}>
          <Avatar bg="purple.500" size="2xl" source={{ uri: user?.photoURL || undefined }}>
            {user?.email?.charAt(0).toUpperCase()}
          </Avatar>
          <Text fontSize="2xl" fontWeight="bold" mt={4} color="gray.700">
            {user?.email}
          </Text>
          <Divider my={5} width="100%" bg="gray.200" />

          <Box width="100%" alignItems="center">
            <Text fontSize="xl" fontWeight="semibold" color="gray.700">
              Meta de água
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mt={2} color="blue.500">
              {goal}ml
            </Text>
            <Slider
              defaultValue={goal}
              minValue={0}
              maxValue={4000}
              step={100}
              width="80%"
              colorScheme="blue"
              onChangeEnd={(value) => setGoal(value)}
            >
              <Slider.Track bg="blue.100">
                <Slider.FilledTrack bg="blue.500" />
              </Slider.Track>
              <Slider.Thumb bg="blue.500" />
            </Slider>
          </Box>

          <Button
            onPress={handleLogout}
            colorScheme="red"
            mt={5}
            width="100%"
            _text={{ fontWeight: "bold" }}
            borderRadius="md"
            p={3}
          >
            Logout
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7fafc", // Fundo suave
    padding: 20,
  },
  authContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "gray.700",
  },
});