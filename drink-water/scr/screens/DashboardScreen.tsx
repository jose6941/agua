import React, { useContext, useEffect, useState } from 'react';
import { Text, HStack, View, Button, Box, VStack, useToast, Heading, Divider, Icon, Pressable, Progress } from 'native-base';
import { UserContext } from '../contexts/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

interface IDashboardProps {}

export const DashboardScreen: React.FC<IDashboardProps> = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        console.error("Erro: UserContext não foi encontrado.");
        return null;
    }

    const { goal } = userContext;
    const [cupSize, setCupSize] = useState<number>(300);
    const [water, setWater] = useState<number>(0);
    const [progress] = useState(new Animated.Value(0)); // Animação de progresso
    const toast = useToast();

    const handleWater = () => {
        setWater(prev => prev + cupSize);
        toast.show({ description: `Você bebeu ${cupSize}ml de água`, duration: 2000 });

        // Animação do progresso
        Animated.timing(progress, {
            toValue: (water + cupSize) / goal,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const handleChangeCupSize = (size: number) => {
        setCupSize(size);
    };

    useEffect(() => {
        if (water >= goal && goal > 0) {
            toast.show({
                description: "Parabéns! Você atingiu sua meta de hidratação!",
                placement: "top",
                colorScheme: "success",
                duration: 3000,
            });
        }
    }, [water]);

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <VStack flex={1} justifyContent="center" alignItems="center" p={6} bg="blue.50">
            {/* Card Principal */}
            <Box bg="white" p={8} rounded="3xl" shadow={6} w="95%" maxW="400px" alignItems="center">
                <Heading fontSize="3xl" mb={6} color="blue.900" fontWeight="extrabold" textAlign="center">
                    💧 Hidratação Diária
                </Heading>
                
                <VStack alignItems="center" space={6} w="100%">
                    {/* Progresso */}
                    <Box w="100%" position="relative">
                        <Text fontSize="lg" color="gray.600" mb={2} textAlign="center">
                            {water}ml / {goal}ml
                        </Text>
                        <Box bg="gray.100" rounded="full" h={3} w="100%" overflow="hidden">
                            <Animated.View
                                style={{
                                    height: '100%',
                                    width: progressWidth,
                                    backgroundColor: '#3B82F6', // Azul
                                    borderRadius: 999,
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Botão de Beber Água */}
                    <Pressable
                        onPress={handleWater}
                        bg="blue.600"
                        p={4}
                        rounded="2xl"
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                        shadow={3}
                        _pressed={{ opacity: 0.8, transform: [{ scale: 0.98 }] }}
                    >
                        <HStack space={2} alignItems="center">
                            <Icon as={MaterialIcons} name="local-drink" size="lg" color="white" />
                            <Text fontSize="xl" color="white" fontWeight="bold">
                                Beber Água
                            </Text>
                        </HStack>
                    </Pressable>
                </VStack>
            </Box>

            {/* Seção de Escolha do Recipiente */}
            <Box mt={8} w="95%" maxW="400px" bg="white" p={6} rounded="3xl" shadow={6}>
                <Heading fontSize="xl" mb={4} color="gray.700" fontWeight="bold" textAlign="center">
                    Escolha o Recipiente
                </Heading>
                <VStack space={4}>
                    {[
                        { size: 200, label: 'Copo Americano', icon: 'local-cafe' },
                        { size: 350, label: 'Xícara', icon: 'local-cafe' },
                        { size: 500, label: 'Garrafa', icon: 'local-drink' },
                    ].map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => handleChangeCupSize(item.size)}
                            bg={cupSize === item.size ? 'blue.100' : 'gray.100'}
                            p={4}
                            rounded="2xl"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            _pressed={{ opacity: 0.8 }}
                        >
                            <HStack space={3} alignItems="center">
                                <Icon as={MaterialIcons} name={item.icon} size="lg" color="blue.600" />
                                <Text fontSize="lg" color="gray.700" fontWeight="medium">
                                    {item.label}
                                </Text>
                            </HStack>
                            <Text fontSize="lg" color="gray.700" fontWeight="bold">
                                {item.size}ml
                            </Text>
                        </Pressable>
                    ))}
                </VStack>
            </Box>
        </VStack>
    );
};