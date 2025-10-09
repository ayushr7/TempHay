import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { Layout, Text } from '@shared/index';

const HomeScreen = () => {
  const email = useAppSelector(state => state.user.email);
  return (
    <Layout style={styles.container}>
      <Layout.Body style={{ backgroundColor: 'red', alignItems: 'center' }}>
        <Text style={styles.title}>Home Screen</Text>
        {email && <Text style={styles.email}>Logged in as: {email}</Text>}
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default HomeScreen;
