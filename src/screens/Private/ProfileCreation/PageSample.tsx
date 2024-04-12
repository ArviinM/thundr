import {Button, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetCompatibilityQuestions} from '../../../hooks/profile/useGetCompatiblityQuestions.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
const PageSample = () => {
  const query = useQueryClient(queryClient);
  const compatibilityQuestions = useGetCompatibilityQuestions({
    sub: 'bd69edf5-19d5-45e2-b147-3237182c5a6f',
  });

  if (compatibilityQuestions.isPending) {
    console.log(1, compatibilityQuestions.isPending);
  }

  if (compatibilityQuestions.isLoading) {
    console.log(2, compatibilityQuestions.isLoading);
  }

  if (compatibilityQuestions.data) {
    console.log(3, compatibilityQuestions.data);
  }

  const auth = useAuth();

  const signOut = async () => {
    auth.signOut();
  };

  const fetchData = async () => {
    await compatibilityQuestions.refetch();
  };

  useEffect(() => {
    if (compatibilityQuestions.isPending) {
      fetchData();
    }
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Test</Text>
        <Text>
          {compatibilityQuestions.isSuccess &&
            compatibilityQuestions.data[0].question}
        </Text>
        <Button title="Sign Out" onPress={signOut} />
        <Button title="Fetch Data" onPress={fetchData} />
      </View>
    </SafeAreaView>
  );
};

export default PageSample;
