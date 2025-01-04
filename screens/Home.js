import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      title: "Peaceful Mind",
      description: "Find your inner calm",
      icon: "🧘‍♀️",
      color: '#E6E6FA',
      shadowColor: '#C5C5E9',
    },
    {
      title: "Growth Journey",
      description: "Transform your life",
      icon: "🌱",
      color: '#E0FFE0',
      shadowColor: '#B8E6B8',
    },
    {
      title: "Safe Space",
      description: "Your comfort zone",
      icon: "🏡",
      color: '#E1F5FE',
      shadowColor: '#B3E5FC',
    },
    {
      title: "Mindful Living",
      description: "Live in the moment",
      icon: "✨",
      color: '#FFF0F5',
      shadowColor: '#FFD6E5',
    },
  ];

  const scrollY = new Animated.Value(0);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);


  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [220, 120],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>

      <Animated.View 
        style={[
          styles.header, 
          { 
            height: headerHeight,
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.headerContent, 
            { 
              transform: [{ scale: headerScale }],
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.siteName}>SolaceSphere</Text>
            <Text style={styles.tagline}>Your Journey to Inner Peace</Text>
          </View>
        </Animated.View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View 
          style={[
            styles.welcomeSection,
            {
              opacity: fadeInAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.welcomeIconContainer,
              {
                transform: [
                  { translateY },
                  { rotate: spin }
                ]
              }
            ]}
          >
            <Text style={styles.welcomeIcon}>🌸</Text>
          </Animated.View>
          <Text style={styles.welcomeMessage}>Welcome to Your Safe Space</Text>
          <View style={styles.decorativeLine} />
        </Animated.View>

        <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
                <View
                    key={index}
                    style={[
                        styles.featureCard,
                        { backgroundColor: feature.color, shadowColor: feature.shadowColor },
                        ]}
                    onPress={() => navigation.navigate(feature.title)}
                >
                    <View
                        style={[
                            styles.featureIconContainer,
                            { backgroundColor: feature.color },
                            ]}
                    >
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    </View>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
            ))}
        </View>

        <View style={styles.navButtonsContainer}>
          {['Services', 'Contact', 'About'].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navButton}
              onPress={() => navigation.navigate(item)}
            >
              <Text style={styles.navButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 SolaceSphere</Text>
        <Text style={styles.footerSubtext}>Nurturing Peace, Growing Together</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#E6E6FA',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  siteName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    marginTop: 220,
  },
  welcomeSection: {
    alignItems: 'center',
    padding: 20,
  },
  welcomeIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  welcomeIcon: {
    fontSize: 50,
  },
  welcomeMessage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  decorativeLine: {
    width: 100,
    height: 4,
    backgroundColor: '#E6E6FA',
    borderRadius: 2,
    marginTop: 15,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: width * 0.44,
    backgroundColor: '#F8F8FF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    fontSize: 35,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  navButtonsContainer: {
    padding: 20,
  },
  navButton: {
    height: 60,
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navButtonText: {
    color: '#4A4A4A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#E6E6FA',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerText: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerSubtext: {
    color: '#666666',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;