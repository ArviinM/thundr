import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

interface CommunityInfoProps {
  communityName: string;
  communityProfileIcon?: string;
}

const CommunityInfo: React.FC<CommunityInfoProps> = ({communityName}) => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'bottom']}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.welcomeText}>About the community</Text>
          <Text style={styles.description}>
            Welcome to the {communityName}! This is a safe space to discuss
            about HIV and AIDS related topics.
          </Text>
          <Text style={styles.description}>
            We want everyone to be part of our community and have their voice
            heard.
          </Text>
          <Text style={styles.description}>
            We encourage your feedback and aim to respond to your comments as
            soon as possible. While we do moderate this community, we welcome
            open discussion.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.welcomeText}>House Rules</Text>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>1</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>Abusive and Violent Language</Text>
              {'\n'}
              Defamatory, indecent, offensive, profane, discriminatory,
              misleading, unlawful or threatening comments are not allowed.
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>2</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>
                Personal and Coordinated Group Attacks
              </Text>
              {'\n'}
              Name-calling, trolling, and abuse will not be tolerated
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>3</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>Spamming</Text>
              {'\n'}
              Posting promotional material or posting links to third-party
              websites is not permitted.
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>4</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>Right to delete comments</Text>
              {'\n'}
              Fraudulent, deceptive or misleading contents will be removed at
              our discretion, and block any repeat offenders.
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>5</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>
                Observance of Individual Differences
              </Text>
              {'\n'}
              Respect that other people in the community have had different life
              experiences from yours. We welcome different viewpoints.
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>6</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>Right to Privacy</Text>
              {'\n'}Our community is a public place. Don't post personal
              information that you would not be comfortable sharing with a
              stranger. We recommend that you don't post anything that can be
              used to identify or locate you, such as your address, email
              address, or phone number.
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>7</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>Corporate Compliance</Text>
              {'\n'}
              Employees participating in the discussion in our community must be
              reminded of their staff guidelines.
            </Text>
          </View>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>8</Text>
            <Text style={styles.ruleText}>
              <Text style={styles.bold}>Obscenity/Nudity</Text>
              {'\n'}
              Photos, videos, and content that show sexual intercourse and
              genitals in any form of media.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'Montserrat-ExtraBold',
    color: 'rgba(0, 0, 0, 0.74)',
    fontSize: scale(14),
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rule: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bold: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(0, 0, 0, 0.74)',
  },
  ruleNumber: {
    fontFamily: 'Montserrat-Bold',
    marginRight: 10,
    fontSize: scale(14),
  },
  ruleText: {
    fontFamily: 'Montserrat-Regular',
    flex: 1, // Allow the rule text to wrap
  },
});

export default CommunityInfo;
