import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, StatusBar, Animated, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AboutMe = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Something went wrong', err));
  };

  const InfoSection = ({ icon, title, children }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; title: string; children: React.ReactNode }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name={icon} size={24} color="#9F7AEA" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionContent}>{children}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1625" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        <View style={styles.profileContainer}>
            <View style={styles.profileWrapper}>
              <View style={styles.imageWrapper}>
                <Image source={require('../../assets/images/DP.webp')} style={styles.image} />
                <View style={styles.imageDecoration} />
              </View>
              
              <View style={styles.profileInfo}>
                <View style={styles.linksContainer}>
                  <TouchableOpacity 
                    style={styles.linkButton} 
                    onPress={() => openLink('https://github.com/MishraShardendu22')}
                  >
                    <MaterialCommunityIcons name="github" size={20} color="#F3F4F6" />
                    <Text style={styles.linkText}>GitHub</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.linkButton} 
                    onPress={() => openLink('https://www.linkedin.com/in/shardendumishra22/')}
                  >
                    <MaterialCommunityIcons name="linkedin" size={20} color="#F3F4F6" />
                    <Text style={styles.linkText}>LinkedIn</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <Text style={styles.name}>Shardendu Mishra</Text>
            <View style={styles.roleContainer}>
              <MaterialCommunityIcons name="code-tags" size={20} color="#9F7AEA" />
              <Text style={styles.role}>Full-Stack Developer</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.bio}>
              A Computer Science Engineering student at IIIT Dharwad who's all about building cool stuff! 
              Passionate about full-stack development and creating seamless user experiences.
            </Text>
          </View>

          <InfoSection icon="tools" title="Skills">
            C++, JavaScript, TypeScript, Go, Python, React Native, Express, Next.js, Fiber, Git, TailwindCSS, SQL, NoSQL, DSA.
          </InfoSection>

          <InfoSection icon="briefcase" title="Experience">
            • Vice President at Velocity (Developer Club at IIIT Dharwad) - Organizing events and mentoring fellow developers.{'\n'}
            • Developer at Vidkarya - Crafting platforms for digital learning.{'\n'}
            • Contributor to Dev Forces - Building a competitive dev platform.
          </InfoSection>

          <InfoSection icon="school" title="Education">
            • 98% in Class 12th from DPS Kalyanpur, Kanpur.{'\n'}
            • Pursuing B.Tech in Computer Science at IIIT Dharwad.
          </InfoSection>

        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1625',
  },
  content: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'relative',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#9F7AEA',
  },
  imageDecoration: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#9F7AEA',
    opacity: 0.3,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(159, 122, 234, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  role: {
    fontSize: 16,
    color: '#9F7AEA',
    marginLeft: 8,
    fontWeight: '500',
  },
  linksContainer: {
    gap: 12,

  },
  linkButton: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#2D2438',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  linkText: {
    fontSize: 16,
    color: '#F3F4F6',
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#2D2438',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bio: {
    fontSize: 16,
    color: '#E2E8F0',
    lineHeight: 24,
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: '#2D2438',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F3F4F6',
    marginLeft: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#E2E8F0',
    lineHeight: 24,
  },
});

export default AboutMe;