// React modules
import React from 'react';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';

// Components
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';

// Utils
import {SETTINGS_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';

const SecurityAndPrivacy = () => {
  const OpenURLButton = ({url}) => {
    const handlePress = async () => {
      await Linking.openURL(url);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text color="#48B5C0" customStyle={{textAlign: 'center'}}>
          https://thundr.ph/
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{top: verticalScale(20)}}>
      <SettingsHeader />
      <View style={{alignItems: 'center', paddingHorizontal: scale(20)}}>
        <Image source={SETTINGS_URI.PRIVACY_POLICY} height={100} width={100} />
        <Separator space={10} />
        <Text
          fontFamily="Montserrat-Bold"
          weight={700}
          size={20}
          color="#808080">
          Privacy Policy
        </Text>
        <Separator space={10} />
        <Text fontFamily="Montserrat-Regular" color="#808080">
          Welcome to the Tanders Inc. Privacy Policy (“Policy”)! This explains
          how we collect, store, protect, and share your information, and with
          whom we share it. We suggest you read this in conjunction with our
          Terms & Conditions of Use. {'\n\n'}
          While enjoying the Thundr mobile application (“App”), our website, or
          using our digital products and services (together, referred to in this
          Privacy Policy as our “Sites”), we collect some information about you.
          In addition, you may choose to use the App or Sites to share
          information with other users, including your friends and contacts
          (“Users”). We may also need to share your information sometimes.
          {'\n\n'}This Policy explains how we protect your personal data, so
          please read very carefully! Who we are{'\n\n'}The App and Sites are
          operated by the “Tanders, Inc.” (also referred to in this policy as
          “we” or “us”). Tanders, Inc. has designated a Data Protection Officer
          and they can be reached by emailing hello@thundr.ph or by post at the
          following address: #92 A. Aguirre Ave., BF Homes, Parañaque City
          {'\n\n'}COLLECTION OF INFORMATION.{'\n\n'}Registration Information
          {'\n\n'}When you download the App and create an account (“Account”),
          we may collect certain information (“Registration Information”) about
          you, such as:{'\n\n'}• Name;{'\n'}• Username;{'\n'}• Email address;
          {'\n'}• Cell number;{'\n'}• Gender identity;{'\n'}• Date of birth;
          {'\n'}• Sexual preference;{'\n'}• Photographs;{'\n'}• Location; and
          {'\n'}• Login information for social media accounts that you connect
          to your Thundr Account (this could include, for example, your
          Facebook, Apple and Google accounts).{'\n\n'}Once you register, you
          will be able to review and change this information at any time just by
          logging in to Thundr (other than your date of birth and location
          (which, if you have given Thundr access to your location in your
          device settings, is automatically updated based on the location of
          your device)). It is your responsibility to ensure that your account
          details are kept up to date. If your phone number changes, please
          ensure that you update this in your account.{'\n\n'}The information we
          collect helps to enhance the App and verify our Users. Registration
          Information such as your age, name and other pertinent data may be
          visible to other Users who view your profile page. Profile Information
          {'\n\n'}
          We recommend and encourage you (and all our members) to think
          carefully about the information you disclose about yourself. We also
          do not recommend that you put email addresses, URLs, instant messaging
          details, phone numbers, full names or addresses, credit card details,
          national identity numbers, drivers’ license details and other
          sensitive information which is open to abuse and misuse on your
          profile. When you post information about yourself or use the messaging
          function to communicate with other Users, the amount of personal
          information you share is at your own risk. Purchases Information
          {'\n\n'}
          If you decide to purchase our premium services, we will process your
          payment information and retain this securely for the prevention of
          fraud and for audit/tax purposes.{'\n\n'}
          Tanders Inc. uses automated decisions to prevent fraudulent payment
          transactions being processed as part of its anti-fraud procedures. In
          order to do this, our systems check payment transactions for behavior
          that indicates breaches of our Terms and Conditions of Use. If a
          transaction meets certain criteria that demonstrate that the Terms and
          Conditions of Use are likely to have been breached and the transaction
          is likely to be fraudulent, the relevant transaction may automatically
          be blocked. Where a transaction is blocked, the user will be notified
          that their transaction cannot be processed and affected Users can
          contact Tanders Inc to contest the decision. Geolocation Information
          {'\n\n'}
          If you have given Thundr access to your location in your device
          settings, when you use your cell, we will collect information about
          WiFi access points as well as other location information about your
          longitude and latitude and may save your device’s coordinates to offer
          certain features to you. This information helps us identify your
          physical location and we use it to personalize the App and make it
          easier for you to interact with other Users, by enabling the general
          locality information to be displayed to Users seeing your profile and
          showing you the profiles of other Users who are near you.{'\n\n'}If
          you have given Thundr access to your location, but wish to turn this
          off, you can do so by the following methods:{'\n\n'}• iPhone app —
          settings, privacy, location services, Thundr{'\n'}• Android —
          settings, location, Thundr permissions, location{'\n'}Device
          Information{'\n\n'}
          We may collect information about your device when you use the App
          including the unique device identifier, device model, and operating
          system, for a number of purposes, as set out in this policy. In
          addition, if you permit us to do so, the App may access your device’s
          address book solely in order to add someone to your contacts.{'\n\n'}
          Links{'\n\n'}
          We may keep track of how you interact with links available on Thundr
          including third party services by redirecting clicks or through other
          means. We may share aggregate click statistics such as how many times
          a particular link was clicked on.{'\n\n'}
          Messages{'\n\n'}
          We review the content of messages sent in the App to identify topics,
          sentiments, and trends across our Users. We will take steps to remove
          personally identifying information from such messages, prior to
          reviewing them. We will not share the content of User messages or
          information we derive from them with any third party.{'\n\n'}
          When you Contact Customer Support{'\n\n'}
          If you contact our Customer Support team via hello@thundr.ph , we will
          receive your email address, and may track your IP address, as well as
          the information you send to us to help resolve your query. We will
          keep records of our communications with you, including any complaints
          that we receive from you about other Users (and from other Users about
          you) for 6 years after deletion of your account.{'\n\n'}
          Cookies and similar technologies{'\n\n'}
          When you visit our Sites or when you use our App, we may collect
          personal data from you automatically by using cookies or similar
          technologies. A cookie is a small file that can be placed on your
          device or browser that allows us to recognize and remember you. If you
          would like to find out more about cookies, including how we use them
          and what choices are available to you, please refer to our Cookie
          Policy.  {'\n\n'} USE OF YOUR INFORMATION.{'\n\n'}Our main goal is to
          ensure your experience on Thundr is an enjoyable one! In order to
          deliver an enjoyable experience to you, we may use your Registration
          and other information to:{'\n\n'}• offer you our services and
          features;{'\n'}• contact you with information about the App (e.g.,
          updates and new features);{'\n'}• personalize the App/Sites and the
          content we deliver to you;{'\n'}• conduct research and analytics about
          how you use and interact with the App/Sites;{'\n'}• to test new
          technologies and processes designed to enhance and improve the
          App/Sites;{'\n'}• resolve disputes, troubleshoot problems and to
          enforce our Terms & Conditions;{'\n'}• investigate fraud, protect our
          legal rights, and to enforce our Terms & Conditions.{'\n'}• protect
          our Users and third parties from harm.{'\n\n'}Our Matching Algorithms
          {'\n\n'}We have developed matching algorithms to predict your
          compatibility with other users and so we can show you people we think
          are a good match for you. Our matching algorithms use the following
          data about you to predict your compatibility with others and generate
          profile recommendations: the things you tell us about yourself in your
          profile; information about your activity in our apps; and your device
          coordinates, which are necessary to understand your proximity to other
          members.{'\n\n'}Moderation Practices{'\n\n'}We use a combination of
          automated systems and a team of moderators to monitor and review
          accounts (including photos and any other information uploaded onto
          user profiles) and messages for content that indicates breaches of our
          Terms and Conditions of Use. If an account or message meets certain
          criteria that demonstrate that the Terms and Conditions of Use are
          likely to have been breached, the relevant account will be subject to
          a warning and the user’s access restricted and/or blocked. Affected
          Users can contact Tanders Inc. to contest the decision.{'\n\n'}
          If you post anything that is inconsistent with our Terms and
          Conditions of Use, we reserve the right to terminate or restrict
          access to your Account.{'\n\n'}
          DISCLOSURE OF INFORMATION.{'\n\n'}
          Our policy is to not disclose your Registration Information or
          personal data, except in the limited circumstances described here:
          {'\n\n'}Circumstances where data may be disclosed{'\n\n'}Disclosed
          data{'\n\n'}Service Providers – We engage certain trusted third
          parties to perform functions and provide services to us. We may share
          your Registration Information or personal data with these third
          parties, but only for the purposes of performing these functions and
          providing such services. More information about this is available
          directly below. This could include all data{'\n\n'}
          Moderators – To monitor activity on the App and approve content.
          {'\n\n'}
          Name and user registration details, profile information, content of
          messages and photographs {'\n\n'}
          Marketing Services Providers – To help us serve marketing and
          advertising on third party websites and applications and measure the
          effectiveness of our advertising campaigns. More information on this
          is available below{'\n\n'}
          estimated location (based on your IP address, gps), age, gender and
          data about your visit to our Sites or App and action taken on those
          (for example if you downloaded our App or created an account with our
          App){'\n\n'}Aggregated Information – We may share aggregated
          information with third parties that includes your personal data (but
          which doesn’t identify you directly) together with other information
          including log data for industry analysis and demographic profiling.
          {'\n\n'}
          MORE INFORMATION ABOUT DISCLOSURES{'\n\n'}Service Providers{'\n\n'}
          We engage certain trusted third parties to perform functions and
          provide services to us (“Service Providers”). The suppliers with which
          Thundr shares User personal data vary depending on a variety of
          factors, such as which of our App, Sites and services a User engages
          with. For example, to provide our services to Users, we typically use
          the following suppliers:{'\n\n'} • Billing services – to allow
          customers to purchase paid features of our App (for example, Google
          Play and Apple Pay){'\n'}• Social media providers – to allow customers
          to create/connect their Thundr account with their account(s) on such
          platforms (for example Facebook, Google or Apple){'\n'}• IT services –
          some of the third-party software providers used in the operation of
          our business may process Users’ personal data (for example, if a User
          contacts us via social media with a support inquiry, their inquiry is
          processed by our community management software provider){'\n\n'}We
          carry out due diligence on all Service Providers we engage to ensure
          they have adequate data protection and information security measures
          in place and only provide them with the personal data necessary to the
          service they are providing. Measures are taken to ensure that the data
          shared is non-attributable to the greatest extent possible and our
          suppliers are also subject to extensive obligations under our
          contractual arrangements, including strict data retention limits.
          {'\n\n'}
          Marketing Services Providers{'\n\n'}
          We partner with providers of marketing services to help us market and
          advertise our App and services on third party websites and
          applications and measure the effectiveness of our advertising
          campaigns. For example:{'\n\n'}• to exclude you from advertising
          campaigns aimed at finding new users, if you already have a Thundr
          account;{'\n'}• to show Thundr adverts to users who have visited the
          App/Sites but haven’t yet created an account;{'\n'}• to create an
          audience for our advertisements of other potential users who have
          similar characteristics to you based on the information the Marketing
          Service Providers holds about you (also known as a Lookalike
          Audience); or{'\n'}• to include you in a ‘custom audience’ that will
          receive Thundr advertising content (a custom audience is essentially a
          list of people who we think are most likely to be interested in a
          particular advertisement).{'\n'}
          We share a limited amount of your personal data with these Marketing
          Services Providers, such as:{'\n'}• the advertising identifier
          associated with your device (this is a random number assigned by your
          mobile device manufacturer (for example Apple or Google) to your
          device to help advertisers (including the manufacturer) know when an
          ad has been viewed or clicked in an app, and when an ad causes a
          ‘conversion’ (for example, downloading the app advertised to you))
          {'\n'}• your estimated location (based on your IP address, gps){'\n'}•
          age and gender{'\n'}• data about your visit to our Sites or App and
          action taken on those (for example if you downloaded our App, created
          an account with our App, or details of any purchases made on Site or
          in App){'\n'}• a hashed* version of your email address (to create
          ‘custom audiences’).{'\n\n'}*Hashing is a way of encrypting
          information by turning it into a combination of random numbers and
          letters - this code cannot be traced back to the email address. When
          hashed email addresses are sent to a Marketing Service Provider,
          they’re then matched against the Provider’s own existing list of their
          own users’ hashed information and our ads are served to those of our
          users who have successfully been matched with the Provider’s. Matched
          and unmatched hashes are then deleted by the Provider.{'\n\n'}
          For more information about how we use cookies and other tracking
          technologies, including how you can set and manage your preferences
          with regards to such technologies, please see our Cookie Policy.  In
          some cases, these third parties will also use the data that they
          collect for their own purposes, for example they may aggregate your
          data with other data they hold and use this to inform advertising
          related services provided to other clients.{'\n\n'}
          WHAT OTHERS MAY SEE ABOUT YOU.{'\n\n '}
          We think our Users are awesome, and we want you to share how awesome
          you are with the world, so we have built certain features to enable
          this. Our App is designed to make it easier for you to connect with
          other Users and to interact with them.{'\n\n'}
          When using the Thundr App, you should assume that anything you post or
          submit on the App may be publicly-viewable and accessible, both by
          Users and non-users of the App. We want our Users to be careful about
          posting information that may eventually be made public.{'\n\n'}
          Please be careful about posting sensitive details about yourself on
          your profile such as your religious denomination, political views, and
          health details. While you may voluntarily provide these information to
          us when you create your profile, there is no requirement to do so.
          Please remember that photographs that you post on Thundr may reveal
          information about yourself as well. Where you do upload and choose to
          tell us sensitive information about yourself, you are explicitly
          consenting to our processing of this information and making it public
          to other Users.{'\n\n'}
          Your Thundr profile and other information you make available via the
          App, including certain information added to your profile through third
          party accounts (such as Facebook) may be viewed and shared by Users
          with individuals who may or may not be users of the App. For example,
          a User may recommend you as a match to his or her Facebook friend(s)
          by taking a screenshot of your profile picture and sharing it,
          regardless of whether such friend(s) is also a User of the App.
          {'\n\n'}
          If you log in to or access the App through your Facebook account or
          another third-party account on a device which you share with others,
          remember to log out of the App and the relevant third-party account
          when you leave the device in order to prevent other users from
          accessing your Thundr account.{'\n\n'}OUR POLICY TOWARDS AGE.{'\n\n'}
          Although we want as many people as possible to enjoy our creation, you
          have to be at least 35 years old to use Thundr.{'\n\n'}
          Thundr does not knowingly collect any information about or market to
          children, minors or anyone under the age of 18. If we become aware
          that a child, minor or anyone under the age of 18 has registered with
          us and provided us with personal information, we will take steps to
          terminate that person’s registration.{'\n\n'}
          SECURITY.{'\n\n'}
          Here at Thundr, we pride ourselves on taking all appropriate security
          measures to help protect your information against loss, misuse and
          unauthorized access, or disclosure. We use reasonable security
          measures to safeguard the confidentiality of your personal information
          such as secured servers using firewalls.{'\n\n'}
          Unfortunately, no website or Internet transmission is ever completely
          100% secure and even we cannot guarantee that unauthorized access,
          hacking, data loss or other breaches will never occur, but here are
          some handy tips to help keep your data secure:{'\n\n'}• Please make
          sure you log out of your Account after use as you never know who may
          stumble onto your Account!{'\n'}• Please don’t share the password you
          use to access your Thundr Account with anyone else! If you ever think
          someone has had access to your password or Account, please let us know
          by emailing us at hello@thundr.ph.{'\n\n'}
          LINKING OTHER ACCOUNTS TO THUNDR.{'\n\n'}
          Using your social media details to sign in to Thundr{'\n\n'}
          When you sign in to our App using your Facebook account, you give
          permission to Facebook to share with us your name and profile picture.
          Unless you opt-out, you also give permission to Facebook to share with
          us your email address (if there is one associated with your Facebook
          account), date of birth, profile photos, gender, Page likes and
          current town/city.{'\n\n'}
          If you register or sign in with your Apple ID, you give Apple
          permission to share your Apple login, a name (that can be edited by
          you) and an email (you can choose to hide your email and Apple will
          create a random email address so your personal email can stay
          private). This email address will be linked to your Thundr account and
          will be used to retrieve your Thundr account.{'\n\n'}
          We will then use this personal data to form your Thundr account. If
          you remove the Thundr app from your Facebook settings, or from your
          Apple ID, we will no longer have access to this data. However, we will
          still have the personal data that we received when you first set up
          your Thundr account using your Facebook or Apple ID (you must delete
          your Thundr account entirely for us to no longer have access to this
          data).{'\n\n'}YOUR RIGHTS.{'\n\n'}Privacy laws applicable in your
          country may give you the following rights:{'\n\n'}• Right to be
          informed: what personal data an organization is processing and why (we
          provide this information to you in this Privacy Policy).{'\n'}• Right
          of access: you can request a copy of your data.{'\n'}• Right of
          rectification: if the data held is inaccurate, you have the right to
          have it corrected.{'\n'}• Right to erasure: you have the right to have
          your data deleted in certain circumstances.{'\n'}• Right to restrict
          processing: in limited circumstances, you have the right to request
          that processing is stopped but the data retained.{'\n'}• Right to data
          portability: you can request a copy of certain data in a
          machine-readable form that can be transferred to another provider.
          {'\n'}• Right to object: in certain circumstances (including where
          data is processed on the basis of legitimate interests or for the
          purposes of marketing) you may object to that processing.{'\n'}•
          Rights related to automated decision-making including profiling: there
          are several rights in this area where processing carried out on a
          solely automated basis results in a decision which has legal or
          significant effects for the individual. In these circumstances your
          rights include the right to ensure that there is human intervention in
          the decision-making process.{'\n'}
          The particular rights which are applicable to you (which might include
          other rights not listed above) may vary depending on your country. You
          should make yourself aware of the rights you have under applicable
          privacy laws in your country. {'\n\n'}
          DATA RETENTION AND DELETION.{'\n\n'}
          We keep your personal information only as long as we need it for the
          legal basis relied upon and as permitted by applicable law. {'\n\n'}
          When your Account is deleted, we make sure it is no longer viewable in
          the App. For up to 30 days, it is still possible to restore your
          Account if it was accidentally deleted. After 30 days, we begin the
          process of deleting your personal information from our systems,
          unless:{'\n\n'}• we must keep it to comply with applicable law (for
          instance, if you make purchases within the App, some personal data may
          be kept for tax and accounting purposes);{'\n'}• we must keep it to
          evidence our compliance with applicable law (for example, if an
          account is blocked, we keep some account information and a record of
          the behavior that led to the block - this information is retained for
          evidential purposes in case of queries or legal claims concerning the
          block);{'\n'}• there is an outstanding issue, claim or dispute
          requiring us to keep the relevant information until it is resolved; or
          {'\n'}• the information must be kept for our legitimate business
          interests, such as fraud prevention and enhancing Users’ safety and
          security (for example, information may need to be kept to prevent a
          user who was banned for unsafe behavior or security incidents from
          opening a new account).{'\n\n'}Warning: Even after you remove
          information from your profile or delete your Account, copies of that
          information may still be viewable and/or accessed to the extent such
          information has been previously shared with others, or copied or
          stored by others. We cannot control this, nor do we accept any
          liability for this. If you have given third party applications or
          websites access to your personal information, they may retain such
          information to the extent permitted under their terms of service or
          privacy policies.{'\n\n'}CHANGES TO THIS POLICY.{'\n\n'}
          As Thundr evolves, we may revise this Privacy Policy from time to
          time. The most current version of the policy will govern our use of
          your information. If we make a change to this policy that, in our sole
          discretion, is material, we will notify you, for example, via an email
          to the email associated with your Account or by posting a notice
          within Thundr.
        </Text>
        <Separator space={50} />
        {/* <OpenURLButton url="https://thundr.ph/" /> */}
      </View>
    </ScrollView>
  );
};

export default SecurityAndPrivacy;
