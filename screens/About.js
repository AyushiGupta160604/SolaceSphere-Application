import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutUs = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const developAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(developAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cameraContainer}>
        {/* Camera Body */}
        <View style={styles.cameraBody}>
          {/* Top Section */}
          <View style={styles.cameraTop}>
            <View style={styles.viewfinderContainer}>
              <View style={styles.viewfinder}>
                <View style={styles.viewfinderInner}>
                  <View style={styles.viewfinderCross} />
                </View>
              </View>
            </View>
            <View style={styles.flashBar}>
              <View style={styles.flashBulb}>
                <View style={styles.flashReflection} />
              </View>
            </View>
          </View>

          {/* Lens Section */}
          <View style={styles.lensSection}>
            <View style={styles.lensRing1}>
              <View style={styles.lensRing2}>
                <View style={styles.lensRing3}>
                  <View style={styles.lensRing4}>
                    <View style={styles.lensGlass}>
                      <View style={styles.lensReflection} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Controls Section */}
          <View style={styles.controlsSection}>
            <View style={styles.leftDial}>
              <View style={styles.dialMarkings} />
              <View style={styles.dialMarkings} Style={[styles.dialMarkings, { transform: [{ rotate: '45deg' }] }]} />
              <View style={styles.dialMarkings} Style={[styles.dialMarkings, { transform: [{ rotate: '90deg' }] }]} />
              <View style={styles.dialCenter} />
            </View>
            <View style={styles.shutterButton}>
              <View style={styles.shutterInner}>
                <View style={styles.shutterCenter} />
              </View>
            </View>
            <View style={styles.filmAdvance}>
              <View style={styles.filmAdvanceLines} />
            </View>
          </View>

          {/* Film Counter */}
          <View style={styles.filmCounter}>
            <Text style={styles.counterText}>01</Text>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.photoSlot} />
          </View>

          {/* Camera Details */}
          <View style={styles.cameraDetails}>
            <View style={styles.screws} />
            <View style={styles.screws} />
          </View>

          {/* Camera Strap Mounts */}
          <View style={styles.strapMount} />
          <View style={[styles.strapMount, styles.strapMountRight]} />
        </View>

        {/* Rest of the component remains the same */}
        <Animated.View
          style={[
            styles.photoStrip,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 40],
                }),
              }],
            }
          ]}
        >
          <View style={styles.developingPhoto}>
            <Animated.View
              style={[
                styles.developingOverlay,
                {
                  opacity: developAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 0],
                  }),
                },
              ]}
            />
            
            <Animated.View 
              style={[
                styles.photoContent,
                {
                  opacity: developAnim,
                }
              ]}
            >
              <Text style={styles.headerText}>About Us</Text>

              <View style={styles.mainContent}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Our Safe Space</Text>
                  <View style={styles.textBox}>
                    <Text style={styles.sectionText}>
                      Welcome to SolaceSphere – Your Oasis of Joy and Mental Well-Being! 
                      Embark on an exhilarating journey towards happiness and self-discovery with us. 
                      At SolaceSphere, we're not just a platform; we're your dedicated companion on the quest for mental well-being. 
                      In this vibrant realm, we celebrate the uniqueness of your mental health journey. 
                      Our features are crafted with care, tailoring an individualized experience that transforms your personal oasis into a sanctuary of support. 
                      Imagine a community where individuals, having triumphed over their mental hurdles, radiate boundless joy and positivity. 
                      Now, picture yourself seamlessly becoming a cherished part of this tapestry of empowerment.
                      It's a destination where your mental well-being takes center stage. Join us and embark on a thrilling adventure towards a brighter, happier you!
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Meet Our Team</Text>
                  <View style={styles.teamMember}>
                    <Image source={require('../assets/ayu_image.jpg')} style={styles.teamImage} />
                    <View style={styles.teamText}>
                      <Text style={styles.teamName}>Ayushi Gupta</Text>
                      <Text style={styles.teamRole}>Founder</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 SolaceSphere. All rights reserved.</Text>
                <View style={styles.socialIcons}>
                  <TouchableOpacity>
                    <Icon name="facebook" size={30} color="#fff" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="twitter" size={30} color="#fff" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="instagram" size={30} color="#fff" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  cameraContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  cameraBody: {
      width: 260,
      height: 200,
      backgroundColor: '#ffb6c1',
      borderRadius: 25,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 12,
      borderWidth: 3,
      borderColor: '#444',
  },
  cameraTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  viewfinder: {
    width: 35,
    height: 35,
    backgroundColor: '#444',
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  viewfinderInner: {
    width: 25,
    height: 25,
    backgroundColor: '#222',
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#666',
  },
  // flashBar: {
  //   width: 70,
  //   height: 25,
  //   backgroundColor: '#e6e6e6',
  //   borderRadius: 12.5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  // },
  lensReflection: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#888',
    shadowColor: '#fff',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  flashBar: {
    width: 70,
    height: 25,
    backgroundColor: '#d9d9d9',
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  flashBulb: {
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashReflection: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    opacity: 0.8,
  },
  lensSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  lensOuter: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  lensMiddle: {
    width: 85,
    height: 85,
    backgroundColor: '#999',
    borderRadius: 42.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#888',
  },
  lensInner: {
    width: 70,
    height: 70,
    backgroundColor: '#666',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#555',
  },
  // lensGlass: {
  //   width: 55,
  //   height: 55,
  //   backgroundColor: '#333',
  //   borderRadius: 27.5,
  //   borderWidth: 1,
  //   borderColor: '#222',
  // },
  lensGlass: {
    width: 55,
    height: 55,
    backgroundColor: '#1c1c1c', // Dark glass
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  leftDial: {
    width: 30,
    height: 30,
    backgroundColor: '#silver',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#999',
  },
  dialLines: {
    width: 2,
    height: 15,
    backgroundColor: '#666',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -1,
    marginTop: -7.5,
  },
  // shutterButton: {
  //   width: 35,
  //   height: 35,
  //   backgroundColor: '#ff4081',
  //   borderRadius: 17.5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 2,
  //   borderColor: '#ff1a75',
  // },
  shutterButton: {
    width: 35,
    height: 35,
    backgroundColor: '#ff3b6b', // Brighter pink for realism
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff1a50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  shutterInner: {
    width: 25,
    height: 25,
    backgroundColor: '#ff1a75',
    borderRadius: 12.5,
  },
  filmCounter: {
    width: 40,
    height: 25,
    backgroundColor: '#333',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // bottomSection: {
  //   width: '100%',
  //   alignItems: 'center',
  // },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  photoSlot: {
    width: '80%',
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
  },
  cameraStrap: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 40,
    height: 10,
    backgroundColor: '#ff9eb5',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },

  photoStrip: {
    width: '100%',
    marginTop: -10,
    alignItems: 'center',
    paddingBottom: 40,
  },
  developingPhoto: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  developingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#d3d3d3',
    zIndex: 1,
  },
  photoContent: {
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6a4c9c',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a4c9c',
    marginBottom: 10,
  },
  textBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  teamText: {
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  teamRole: {
    fontSize: 16,
    color: '#777',
  },
  footer: {
    backgroundColor: '#6a4c9c',
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default AboutUs;