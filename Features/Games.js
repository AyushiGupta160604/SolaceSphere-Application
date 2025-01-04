// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Games = ({ navigation }) => {
//   const [selectedGame, setSelectedGame] = useState(null);
//   const [scores, setScores] = useState({});
//   const [level, setLevel] = useState(1);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [breathCount, setBreathCount] = useState(0);
//   const breathAnimation = new Animated.Value(1);

//   // Load saved scores and leaderboard on component mount
//   useEffect(() => {
//     loadSavedData();
//   }, []);

//   const loadSavedData = async () => {
//     try {
//       const savedScores = await AsyncStorage.getItem('scores');
//       const savedLeaderboard = await AsyncStorage.getItem('leaderboard');
//       if (savedScores) setScores(JSON.parse(savedScores));
//       if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard));
//     } catch (error) {
//       console.error('Error loading saved data:', error);
//     }
//   };

//   const updateScore = async (gameId, newScore) => {
//     const updatedScores = {
//       ...scores,
//       [gameId]: Math.max(scores[gameId] || 0, newScore),
//     };
//     setScores(updatedScores);
//     try {
//       await AsyncStorage.setItem('scores', JSON.stringify(updatedScores));
//       updateLeaderboard(gameId, newScore);
//     } catch (error) {
//       console.error('Error saving score:', error);
//     }
//   };

//   const updateLeaderboard = async (gameId, score) => {
//     const updatedLeaderboard = [...leaderboard];
//     const entry = {
//       gameId,
//       score,
//       date: new Date().toISOString(),
//     };
//     updatedLeaderboard.push(entry);
//     updatedLeaderboard.sort((a, b) => b.score - a.score);
//     const topScores = updatedLeaderboard.slice(0, 10);
//     setLeaderboard(topScores);
//     try {
//       await AsyncStorage.setItem('leaderboard', JSON.stringify(topScores));
//     } catch (error) {
//       console.error('Error saving leaderboard:', error);
//     }
//   };

//   const games = [
//     {
//       id: 1,
//       title: 'Breathing Bubbles',
//       description: 'Pop bubbles in rhythm with your breath',
//       icon: 'bubble-chart',
//       color: '#4CAF50',
//       levels: [
//         { required: 10, duration: 4000 },
//         { required: 15, duration: 3500 },
//         { required: 20, duration: 3000 },
//       ],
//     },
//     {
//       id: 2,
//       title: 'Memory Cards',
//       description: 'Match pairs of calming images',
//       icon: 'grid-view',
//       color: '#2196F3',
//       levels: [
//         { pairs: 3, timeLimit: 30 },
//         { pairs: 4, timeLimit: 45 },
//         { pairs: 6, timeLimit: 60 },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Focus Flow',
//       description: 'Follow the pattern of lights and sounds',
//       icon: 'lightbulb',
//       color: '#9C27B0',
//       levels: [
//         { sequence: 4, speed: 1000 },
//         { sequence: 6, speed: 800 },
//         { sequence: 8, speed: 600 },
//       ],
//     },
//     {
//       id: 4,
//       title: 'Zen Garden',
//       description: 'Design your own peaceful garden',
//       icon: 'nature',
//       color: '#FF9800',
//       levels: [
//         { elements: 5, time: 120 },
//         { elements: 8, time: 180 },
//         { elements: 12, time: 240 },
//       ],
//     },
//     {
//       id: 5,
//       title: 'Sound Journey',
//       description: 'Create peaceful melodies',
//       icon: 'music-note',
//       color: '#E91E63',
//       levels: [
//         { notes: 4, tempo: 'slow' },
//         { notes: 6, tempo: 'medium' },
//         { notes: 8, tempo: 'fast' },
//       ],
//     },
//     {
//       id: 6,
//       title: 'Mindful Maze',
//       description: 'Navigate through a peaceful labyrinth',
//       icon: 'gesture',
//       color: '#795548',
//       levels: [
//         { size: 5, obstacles: 3 },
//         { size: 7, obstacles: 5 },
//         { size: 9, obstacles: 7 },
//       ],
//     },
//   ];

//   const startBreathingAnimation = (duration = 4000) => {
//     Animated.sequence([
//       Animated.timing(breathAnimation, {
//         toValue: 1.5,
//         duration: duration,
//         useNativeDriver: true,
//       }),
//       Animated.timing(breathAnimation, {
//         toValue: 1,
//         duration: duration,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setBreathCount(prev => prev + 1);
//       const currentGame = games[0];
//       const currentLevel = currentGame.levels[level - 1];
      
//       if (breathCount + 1 >= currentLevel.required) {
//         const score = Math.floor((breathCount + 1) * (1000 / duration));
//         updateScore(1, score);
//         Alert.alert(
//           'Level Complete!',
//           `Score: ${score}\nBreaths: ${breathCount + 1}`,
//           [
//             {
//               text: 'Next Level',
//               onPress: () => {
//                 if (level < currentGame.levels.length) {
//                   setLevel(prev => prev + 1);
//                 }
//                 setBreathCount(0);
//               },
//             },
//           ]
//         );
//       } else {
//         startBreathingAnimation(duration);
//       }
//     });
//   };

//   const BreathingBubbles = () => {
//     const currentLevel = games[0].levels[level - 1];
//     return (
//       <View style={styles.gameContainer}>
//         <Text style={styles.gameTitle}>Breathing Bubbles</Text>
//         <Text style={styles.levelText}>Level {level}</Text>
//         <Text style={styles.breathingText}>
//           Breaths: {breathCount}/{currentLevel.required}
//         </Text>
//         <Text style={styles.scoreText}>
//           High Score: {scores[1] || 0}
//         </Text>
//         <TouchableOpacity
//           onPress={() => {
//             setBreathCount(0);
//             startBreathingAnimation(currentLevel.duration);
//           }}
//         >
//           <Animated.View
//             style={[
//               styles.bubble,
//               {
//                 transform: [{ scale: breathAnimation }],
//                 backgroundColor: games[0].color,
//               },
//             ]}
//           />
//         </TouchableOpacity>
//         <Text style={styles.instructions}>
//           Level {level}: Complete {currentLevel.required} breaths
//           {'\n'}Breathe in as the bubble grows, out as it shrinks
//         </Text>
//       </View>
//     );
//   };

//   const MemoryCards = () => {
//     const [flippedCards, setFlippedCards] = useState([]);
//     const [matchedPairs, setMatchedPairs] = useState([]);
//     const [timeLeft, setTimeLeft] = useState(games[1].levels[level - 1].timeLimit);
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//       let timer;
//       if (isPlaying && timeLeft > 0) {
//         timer = setInterval(() => {
//           setTimeLeft(prev => prev - 1);
//         }, 1000);
//       } else if (timeLeft === 0) {
//         endGame();
//       }
//       return () => clearInterval(timer);
//     }, [isPlaying, timeLeft]);

//     const currentLevel = games[1].levels[level - 1];
//     const cards = generateCards(currentLevel.pairs);

//     function generateCards(pairs) {
//       const icons = ['spa', 'self-improvement', 'psychology', 'favorite', 'pets', 'eco'];
//       const selectedIcons = icons.slice(0, pairs);
//       const cardPairs = [...selectedIcons, ...selectedIcons];
//       return cardPairs.sort(() => Math.random() - 0.5).map((icon, index) => ({
//         id: index,
//         icon,
//       }));
//     }

//     const handleCardPress = (index) => {
//       if (!isPlaying) {
//         setIsPlaying(true);
//       }
      
//       if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(index)) {
//         return;
//       }

//       const newFlippedCards = [...flippedCards, index];
//       setFlippedCards(newFlippedCards);

//       if (newFlippedCards.length === 2) {
//         if (cards[newFlippedCards[0]].icon === cards[newFlippedCards[1]].icon) {
//           setMatchedPairs([...matchedPairs, ...newFlippedCards]);
//           setFlippedCards([]);
//           if (matchedPairs.length + 2 === cards.length) {
//             endGame();
//           }
//         } else {
//           setTimeout(() => setFlippedCards([]), 1000);
//         }
//       }
//     };

//     const endGame = () => {
//       setIsPlaying(false);
//       const score = Math.floor((matchedPairs.length / 2) * (timeLeft * 100));
//       updateScore(2, score);
//       Alert.alert(
//         'Game Over!',
//         `Score: ${score}\nPairs Matched: ${matchedPairs.length / 2}`,
//         [
//           {
//             text: 'Next Level',
//             onPress: () => {
//               if (level < games[1].levels.length) {
//                 setLevel(prev => prev + 1);
//               }
//               setFlippedCards([]);
//               setMatchedPairs([]);
//               setTimeLeft(games[1].levels[level - 1].timeLimit);
//             },
//           },
//         ]
//       );
//     };

//     return (
//       <View style={styles.gameContainer}>
//         <Text style={styles.gameTitle}>Memory Cards</Text>
//         <Text style={styles.levelText}>Level {level}</Text>
//         <Text style={styles.scoreText}>High Score: {scores[2] || 0}</Text>
//         <Text style={styles.timerText}>Time: {timeLeft}s</Text>
//         <View style={styles.cardGrid}>
//           {cards.map((card, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.card,
//                 (flippedCards.includes(index) || matchedPairs.includes(index)) && styles.cardFlipped,
//               ]}
//               onPress={() => handleCardPress(index)}
//             >
//               {(flippedCards.includes(index) || matchedPairs.includes(index)) ? (
//                 <MaterialIcons name={card.icon} size={32} color="#654EA3" />
//               ) : (
//                 <MaterialIcons name="help-outline" size={32} color="#654EA3" />
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   const FocusFlow = () => {
//     const [sequence, setSequence] = useState([]);
//     const [playerSequence, setPlayerSequence] = useState([]);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isShowingSequence, setIsShowingSequence] = useState(false);
    
//     const currentLevel = games[2].levels[level - 1];
//     const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

//     useEffect(() => {
//       if (sequence.length === 0 && isPlaying) {
//         generateSequence();
//       }
//     }, [isPlaying]);

//     const generateSequence = () => {
//       const newSequence = Array(currentLevel.sequence)
//         .fill(0)
//         .map(() => Math.floor(Math.random() * colors.length));
//       setSequence(newSequence);
//       showSequence(newSequence);
//     };

//     const showSequence = async (seq) => {
//       setIsShowingSequence(true);
//       for (let i = 0; i < seq.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, currentLevel.speed));
//         // Flash the color
//       }
//       setIsShowingSequence(false);
//     };

//     const handleColorPress = (colorIndex) => {
//       if (isShowingSequence) return;
      
//       const newPlayerSequence = [...playerSequence, colorIndex];
//       setPlayerSequence(newPlayerSequence);

//       if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
//         endGame(false);
//       } else if (newPlayerSequence.length === sequence.length) {
//         endGame(true);
//       }
//     };

//     const endGame = (success) => {
//       setIsPlaying(false);
//       const score = success ? Math.floor(sequence.length * (1000 / currentLevel.speed)) : 0;
//       if (success) {
//         updateScore(3, score);
//         Alert.alert(
//           'Level Complete!',
//           `Score: ${score}`,
//           [
//             {
//               text: 'Next Level',
//               onPress: () => {
//                 if (level < games[2].levels.length) {
//                   setLevel(prev => prev + 1);
//                 }
//                 setSequence([]);
//                 setPlayerSequence([]);
//                 setIsPlaying(true);
//               },
//             },
//           ]
//         );
//       } else {
//         Alert.alert(
//           'Game Over',
//           'Try again!',
//           [
//             {
//               text: 'Restart',
//               onPress: () => {
//                 setSequence([]);
//                 setPlayerSequence([]);
//                 setIsPlaying(true);
//               },
//             },
//           ]
//         );
//       }
//     };

//     return (
//       <View style={styles.gameContainer}>
//         <Text style={styles.gameTitle}>Focus Flow</Text>
//         <Text style={styles.levelText}>Level {level}</Text>
//         <Text style={styles.scoreText}>High Score: {scores[3] || 0}</Text>
        
//         {!isPlaying ? (
//           <TouchableOpacity
//             style={styles.startButton}
//             onPress={() => setIsPlaying(true)}
//           >
//             <Text style={styles.startButtonText}>Start Game</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.colorGrid}>
//             {colors.map((color, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[styles.colorButton, { backgroundColor: color }]}
//                 onPress={() => handleColorPress(index)}
//                 disabled={isShowingSequence}
//               />
//             ))}
//           </View>
//         )}
//       </View>
//     );
//   };

//   const LeaderboardView = () => {
//     return (
//       <View style={styles.leaderboardContainer}>
//         <Text style={styles.gameTitle}>Leaderboard</Text>
//         <ScrollView>
//           {leaderboard.map((entry, index) => {
//             const game = games.find(g => g.id === entry.gameId);
//             return (
//               <View key={index} style={styles.leaderboardEntry}>
//                 <Text style={styles.rankText}>#{index + 1}</Text>
//                 <View style={styles.entryDetails}>
//                   <Text style={styles.gameNameText}>{game?.title}</Text>
//                   <Text style={styles.scoreText}>Score: {entry.score}</Text>
//                   <Text style={styles.dateText}>
//                     {new Date(entry.date).toLocaleDateString()}
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </ScrollView>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {!selectedGame ? (
//         <>
//           <Text style={styles.header}>Mindfulness Games</Text>
//           <ScrollView>
//             {games.map((game) => (
//               <TouchableOpacity
//                 key={game.id}
//                 style={[styles.gameCard, { borderColor: game.color }]}
//                 onPress={() => setSelectedGame(game.id)}
//               >
//                 <MaterialIcons name={game.icon} size={32} color={game.color} />
//                 <View style={styles.gameInfo}>
//                   <Text style={styles.gameCardTitle}>{game.title}</Text>
//                   <Text style={styles.gameDescription}>{game.description}</Text>
//                 </View>
//                 <Text style={[styles.score, { color: game.color }]}>
//                   {scores[game.id] || 0}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <TouchableOpacity
//             style={styles.leaderboardButton}
//             onPress={() => setSelectedGame('leaderboard')}
//           >
//             <Text style={styles.leaderboardButtonText}>View Leaderboard</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => {
//               setSelectedGame(null);
//               setLevel(1);
//               setBreathCount(0);
//             }}
//           >
//             <MaterialIcons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//           {selectedGame === 1 && <BreathingBubbles />}
//           {selectedGame === 2 && <MemoryCards />}
//           {selectedGame === 3 && <FocusFlow />}
//           {selectedGame === 'leaderboard' && <LeaderboardView />}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   gameCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 2,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   gameInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   gameCardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   gameDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
//   score: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   gameContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   gameTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   levelText: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   scoreText: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   bubble: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     margin: 20,
//   },
//   instructions: {
//     textAlign: 'center',
//     marginTop: 16,
//     color: '#666',
//   },
//   cardGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     padding: 8,
//   },
//   card: {
//     width: 80,
//     height: 80,
//     margin: 4,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   cardFlipped: {
//     backgroundColor: '#fff',
//     borderWidth: 2,
//     borderColor: '#654EA3',
//   },
//   colorGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 16,
//   },
//   colorButton: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   startButton: {
//     backgroundColor: '#654EA3',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   startButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 16,
//     left: 16,
//     zIndex: 1,
//   },
//   leaderboardButton: {
//     backgroundColor: '#654EA3',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 16,
//     alignItems: 'center',
//   },
//   leaderboardButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   leaderboardContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   leaderboardEntry: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//   },
//   rankText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginRight: 12,
//   },
//   entryDetails: {
//     flex: 1,
//   },
//   gameNameText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dateText: {
//     fontSize: 12,
//     color: '#666',
//   },
// });

// export default Games;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Games = ({ navigation }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [progress, setProgress] = useState({});
  const [level, setLevel] = useState(1);
  const [breathCount, setBreathCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const breathAnimation = new Animated.Value(1);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('mindfulness_progress');
      if (savedProgress) setProgress(JSON.parse(savedProgress));
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const updateProgress = async (gameId, minutes) => {
    const updatedProgress = {
      ...progress,
      [gameId]: (progress[gameId] || 0) + minutes,
    };
    setProgress(updatedProgress);
    try {
      await AsyncStorage.setItem('mindfulness_progress', JSON.stringify(updatedProgress));
      setSessionCount(prev => prev + 1);
      if (sessionCount === 5) {
        Alert.alert(
          'Mindfulness Milestone!',
          "You've completed 5 mindfulness sessions. Remember, consistency is key to building a mindful practice. How are you feeling?",
          [{ text: 'Continue Practice', onPress: () => setSessionCount(0) }]
        );
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const games = [
    {
      id: 1,
      title: 'Breathing Space',
      description: 'Guided breathing exercises for calm and focus',
      icon: 'air',
      color: '#4CAF50',
      levels: [
        { name: 'Basic Breath Awareness', duration: 180, breathPattern: '4-4-4-4' },
        { name: 'Extended Exhale', duration: 300, breathPattern: '4-6-4-6' },
        { name: 'Box Breathing', duration: 300, breathPattern: '4-4-4-4' },
      ],
    },
    {
      id: 2,
      title: 'Peaceful Pairs',
      description: 'Mindful matching for present-moment awareness',
      icon: 'spa',
      color: '#2196F3',
      levels: [
        { name: 'Gentle Start', pairs: 4, theme: 'Nature' },
        { name: 'Mindful Flow', pairs: 6, theme: 'Emotions' },
        { name: 'Deep Focus', pairs: 8, theme: 'Elements' },
      ],
    },
    {
      id: 3,
      title: 'Sound Journey',
      description: 'Create calming melodies through mindful interaction',
      icon: 'music-note',
      color: '#9C27B0',
      levels: [
        { name: 'Simple Harmony', sounds: ['rain', 'wind', 'waves'] },
        { name: 'Nature\'s Symphony', sounds: ['birds', 'creek', 'leaves'] },
        { name: 'Deep Resonance', sounds: ['bowl', 'chimes', 'bells'] },
      ],
    },
    {
      id: 4,
      title: 'Zen Garden',
      description: 'Digital sand garden for meditation and reflection',
      icon: 'nature',
      color: '#FF9800',
      patterns: ['waves', 'circles', 'lines'],
      elements: ['stones', 'plants', 'water'],
    }
  ];

  const BreathingSpace = () => {
    const currentLevel = games[0].levels[level - 1];
    const [phase, setPhase] = useState('inhale');
    const [paused, setPaused] = useState(true);
    
    useEffect(() => {
      let timer;
      if (!paused) {
        startBreathingCycle();
      }
      return () => clearTimeout(timer);
    }, [paused, phase]);

    const startBreathingCycle = () => {
      const pattern = currentLevel.breathPattern.split('-').map(Number);
      const phases = ['inhale', 'hold', 'exhale', 'rest'];
      const currentPhaseIndex = phases.indexOf(phase);
      const duration = pattern[currentPhaseIndex] * 1000;

      Animated.timing(breathAnimation, {
        toValue: phase === 'inhale' ? 1.5 : 1,
        duration: duration,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setPhase(phases[(currentPhaseIndex + 1) % 4]);
          setBreathCount(prev => prev + (phase === 'rest' ? 1 : 0));
        }, duration);
      });
    };

    const getInstructions = () => {
      switch (phase) {
        case 'inhale': return 'Breathe in slowly...';
        case 'hold': return 'Hold your breath...';
        case 'exhale': return 'Release slowly...';
        case 'rest': return 'Rest...';
      }
    };

    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>{currentLevel.name}</Text>
        <Text style={styles.breathingInstructions}>{getInstructions()}</Text>
        <TouchableOpacity onPress={() => setPaused(!paused)}>
          <Animated.View
            style={[
              styles.breathCircle,
              {
                transform: [{ scale: breathAnimation }],
                backgroundColor: phase === 'hold' ? '#81C784' : '#4CAF50',
              },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.breathCount}>Breaths: {breathCount}</Text>
        <Text style={styles.instructions}>
          {`This is ${currentLevel.name}. Focus on the expanding and contracting circle.\n\n`}
          `The pattern is: Inhale (${currentLevel.breathPattern.split('-')[0]}s), 
           Hold (${currentLevel.breathPattern.split('-')[1]}s), 
           Exhale (${currentLevel.breathPattern.split('-')[2]}s), 
           Rest (${currentLevel.breathPattern.split('-')[3]}s)`
        </Text>
      </View>
    );
  };

  const PeacefulPairs = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [message, setMessage] = useState('');
    const currentLevel = games[1].levels[level - 1];

    const themes = {
      Nature: ['🌳', '🌊', '🌸', '🍃'],
      Emotions: ['😊', '😌', '🥰', '😇'],
      Elements: ['🔥', '💨', '💧', '⭐'],
    };

    useEffect(() => {
      const symbols = themes[currentLevel.theme].slice(0, currentLevel.pairs);
      const cardPairs = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({ id: index, symbol }));
      setCards(cardPairs);
    }, [level]);

    const handleCardPress = (index) => {
      if (flipped.length === 2 || flipped.includes(index)) return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);
      
      if (newFlipped.length === 2) {
        if (cards[newFlipped[0]].symbol === cards[newFlipped[1]].symbol) {
          setMatched([...matched, ...newFlipped]);
          setFlipped([]);
          setMessage('Take a moment to notice how this match makes you feel...');
        } else {
          setTimeout(() => {
            setFlipped([]);
            setMessage('Practice patience and stay present...');
          }, 1500);
        }
      }
    };

    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>{currentLevel.name}</Text>
        <Text style={styles.mindfulPrompt}>{message}</Text>
        <View style={styles.cardGrid}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                (flipped.includes(index) || matched.includes(index)) && styles.cardRevealed
              ]}
              onPress={() => handleCardPress(index)}
            >
              <Text style={styles.cardSymbol}>
                {(flipped.includes(index) || matched.includes(index)) ? card.symbol : '🎯'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.instructions}>
          Take three deep breaths before starting.
          Match the pairs while staying mindful of your thoughts and feelings.
          There's no time limit - move at your own peaceful pace.
        </Text>
      </View>
    );
  };

  const SoundJourney = () => {
    const currentLevel = games[2].levels[level - 1];
    const [activeSound, setActiveSound] = useState(null);
    const [reflection, setReflection] = useState('');

    const playSound = (sound) => {
      setActiveSound(sound);
      // Here you would implement actual sound playing logic
      setTimeout(() => {
        setReflection(`Notice how the ${sound} sound affects your state of mind...`);
      }, 2000);
    };

    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>{currentLevel.name}</Text>
        <Text style={styles.mindfulPrompt}>{reflection}</Text>
        <View style={styles.soundGrid}>
          {currentLevel.sounds.map((sound, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.soundButton,
                activeSound === sound && styles.soundButtonActive
              ]}
              onPress={() => playSound(sound)}
            >
              <Text style={styles.soundText}>{sound}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.instructions}>
          Find a comfortable position and take a few deep breaths.
          Click each sound and notice its effect on your body and mind.
          There's no right or wrong way - simply observe and experience.
        </Text>
      </View>
    );
  };

  const ZenGarden = () => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [pattern, setPattern] = useState(null);

    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>Zen Garden</Text>
        <View style={styles.toolbox}>
          {games[3].patterns.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tool, selectedTool === tool && styles.toolSelected]}
              onPress={() => setSelectedTool(tool)}
            >
              <Text style={styles.toolText}>{tool}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.zenCanvas}>
          {/* Implement drawing area here */}
        </View>
        <View style={styles.elementBox}>
          {games[3].elements.map((element, index) => (
            <TouchableOpacity
              key={index}
              style={styles.element}
              onPress={() => setPattern(element)}
            >
              <Text style={styles.elementText}>{element}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.instructions}>
          Create your own peaceful space.
          Draw patterns in the sand, place elements mindfully.
          Focus on the present moment and let your creativity flow naturally.
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    gameCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginBottom: 16,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 2,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    gameInfo: {
      flex: 1,
      marginLeft: 16,
    },
    gameTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#333',
    },
    gameDescription: {
      fontSize: 14,
      color: '#666',
    },
    backButton: {
      padding: 16,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    gameContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    breathCount: {
      fontSize: 18,
      marginTop: 20,
      color: '#666',
    },
    instructions: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginTop: 20,
      paddingHorizontal: 16,
      lineHeight: 20,
    },
    cardGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
      padding: 16,
    },
    card: {
      width: 80,
      height: 80,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#ddd',
    },
    cardRevealed: {
      backgroundColor: '#e3f2fd',
      borderColor: '#2196F3',
    },
    cardSymbol: {
      fontSize: 32,
    },
    element: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
    },
    elementText: {
      color: '#333',
      fontSize: 16,
    },
    toolText: {
      color: '#333',
      fontSize: 16,
    },
    levelSelector: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 16,
      padding: 8,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
    },
    levelButton: {
      padding: 8,
      borderRadius: 4,
    },
    levelButtonActive: {
      backgroundColor: '#4CAF50',
    },
    levelButtonText: {
      color: '#333',
      fontSize: 14,
    },
    levelButtonTextActive: {
      color: '#fff',
    }
  });

  return (
    <View style={styles.container}>
      {selectedGame ? (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSelectedGame(null);
              setLevel(1);
              setBreathCount(0);
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.levelSelector}>
            {[1, 2, 3].map((lvl) => (
              <TouchableOpacity
                key={lvl}
                style={[
                  styles.levelButton,
                  level === lvl && styles.levelButtonActive,
                ]}
                onPress={() => setLevel(lvl)}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    level === lvl && styles.levelButtonTextActive,
                  ]}
                >
                  Level {lvl}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedGame === 1 && <BreathingSpace />}
          {selectedGame === 2 && <PeacefulPairs />}
          {selectedGame === 3 && <SoundJourney />}
          {selectedGame === 4 && <ZenGarden />}
        </>
      ) : (
        <ScrollView>
          <Text style={styles.header}>Mindfulness Journey</Text>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[styles.gameCard, { borderColor: game.color }]}
              onPress={() => setSelectedGame(game.id)}
            >
              <MaterialIcons name={game.icon} size={32} color={game.color} />
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <Text style={styles.progressText}>
                  Time spent: {Math.round(progress[game.id] || 0)} minutes
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Games;