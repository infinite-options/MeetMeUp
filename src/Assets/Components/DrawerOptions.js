import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import DrawerContext from './DrawerContext';
import BodyScroll from './BodyScroll';
const DrawerOptions = () => {
  const [open, setOpen] = useState(false);
  const { option, setOption } = useContext(DrawerContext);
  const { specifics, handleSetSpecifics } = useContext(DrawerContext);
  const { passData, complete, setComplete, setPassData } = useContext(DrawerContext);
  const [textValue, setTextValue] = useState('');
  const [religionValue, setReligionValue] = useState('');
  const [name, setName] = useState('');
  const [nationalityValue, setNationalityValue] = useState('');
  const [jobValue, setJobValue] = useState('');

  useEffect(() => {
    if (option) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [option]);

  const TitleBox = ({ title, subtitle }) => (
    <View style={styles.titleBox}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );

  const ContentBox = ({ content }) => (
    <View style={styles.contentBox}>
      <ScrollView style={styles.scrollContainer}>{content}</ScrollView>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => {
          if (option === 'religion') {
            handleSetSpecifics('religion', religionValue);
          } else if (option === 'nationality') {
            handleSetSpecifics('nationality', nationalityValue);
          } else if (option === 'position') {
            handleSetSpecifics('position', jobValue);
          }
          setComplete(true);
          setOption('');
        }}
      >
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setComplete(false);
        setOption('');
      }}
    >
      <View style={styles.modalContainer}>
        {option === 'education' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Your Education'} subtitle={'List all of the educational achievements you are proud of below.'} />
            <ContentBox content={<BodyScroll options={['Did not finish High School',
                        'Finished High School',
                        'Did not finish College',
                        "Completed Associates Degree",
                        "Completed Bachelors Degree",
                        "Completed Graduate Degree",]} />} />
          </View>
        )}
         {option === 'body' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Body Composition'} subtitle={'This helps us match you to a similar lifestyle.'} />
            <ContentBox content={<BodyScroll options={[ 
                        'Slim',
                        'Athlete',
                        'Curvy',
                        'Plus Size',
                        'Few Extra Pounds']} />} />
          </View>
        )}
         {option === 'star' && (
          <View style={styles.modalContent}>
            <TitleBox title={"What's your Star Sign?"} subtitle={'Some of our users love to know what personality traits you have.'} />
            <ContentBox content={<BodyScroll options={[ 'Aries', 
                    'Taurus', 
                    'Gemini',
                    'Cancer', 
                    'Leo',
                    'Virgo', 
                    'Libra', 
                    'Scorpio', 
                    'Sagittarius', 
                    'Capricorn', 
                    'Aquarius', 
                    'Pisces']} />} />
          </View>
        )}
         {option === 'drinking' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Your Drinking Habits'} subtitle={'What are your current drinking habits? Please provide an accurate answer.'} />
            <ContentBox content={<BodyScroll options={[     
                    "I don't drink",
                    'Socially',
                    'Casual Drinker',
                    'Regularly',]} />} />
          </View>
        )}
           {option === 'smoking' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Your Smoking Habits'} subtitle={'What are your current smoking habits? Please provide an accurate answer.'} />
            <ContentBox content={<BodyScroll options={[     
                     "I don't smoke",
                     'Socially',
                     'Casual Smoker',
                     'Regularly',]} />} />
          </View>
        )}
            {option === 'children' && (
                    <View style={styles.modalContent}>
                        <TitleBox title={'Do You Have Any Children'} subtitle={'If you have any children please select an accurate amount.'} />
                        <ContentBox content={<BodyScroll options={[     
                               '0',
                               '1',
                               '2',
                               '3',
                               '4',
                               '5',
                               '6',
                               '7',
                               '8',
                               '9',
                               '10']} />} />
                    </View>
                    )}
        {option === 'religion' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Religion'} subtitle={'Tell us about your religion.'} />
            <ContentBox
              content={
                <TextInput
                  style={styles.input}
                  value={religionValue}
                  onChangeText={(text) => setReligionValue(text)}
                  placeholder="Your Religion"
                  autoFocus
                />
              }
            />
          </View>
        )}

        {option === 'position' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Your Current Position'} subtitle={'What is your current job?'} />
            <ContentBox
              content={
                <TextInput
                  style={styles.input}
                  value={jobValue}
                  onChangeText={(text) => setJobValue(text)}
                  placeholder="Your Job"
                  autoFocus
                />
              }
            />
          </View>
        )}

        {option === 'nationality' && (
          <View style={styles.modalContent}>
            <TitleBox title={'Your Nationality'} subtitle={'What is your nationality?'} />
            <ContentBox
              content={
                <TextInput
                  style={styles.input}
                  value={nationalityValue}
                  onChangeText={(text) => setNationalityValue(text)}
                  placeholder="Your Nationality"
                  autoFocus
                />
              }
            />
          </View>
        )}

        {option === 'height' && (
          <View style={styles.modalContent}>
            <TitleBox title={"What's Your Height?"} subtitle={'Choose your height.'} />
            <ContentBox content={<BodyScroll options={['166', '167', '168', '169', '170']} />} />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default DrawerOptions;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
  },
  contentBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollContainer: {
    maxHeight: 150,
    width: '100%',
  },
  completeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    width: '100%',
  },
});
