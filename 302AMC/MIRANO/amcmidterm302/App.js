import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [enteredYear, setEnteredYear] = useState('');
  const [enteredCourse, setEnteredCourse] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null)



    
const handleItemCLick = (item) => {
    setSelectedItem(item);
    setCurrentScreen('detail');
};








  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const yearInputHandler = (EnteredYear) => {
    setEnteredYear(EnteredYear);
  }

   const courseInputHandler = (EnteredCourse) => {
    setEnteredCourse(EnteredCourse);
  }
 
  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;
    if(enteredYear.trim()=== '') return;
    if(enteredCourse.trim()=== '') return;

    if (editingIndex !== null) {
      const updatedGoals = [...courseGoals];
      updatedGoals[editingIndex] = { text: enteredGoalText, sect: enteredYear, course: enteredCourse, id: updatedGoals[editingIndex].id };
      setCourseGoals(updatedGoals);
      setEditingIndex(null);
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, sect: enteredYear, course: enteredCourse, id: Math.random().toString() },
      ]);
    }
    setEnteredGoalText('');
  };

  const deleteGoalHandler = (index) => {
    const updatedGoals = [...courseGoals];
    updatedGoals.splice(index, 1);
    setCourseGoals(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditingHandler = (index) => {
    setEnteredGoalText(courseGoals[index].text);
    setEditingIndex(index);
  };

  return (
    <View>
      <View>
      <Text> Name </Text>
        <TextInput style={styles.input}
          placeholder="Student name"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
         <Text> Year And Section </Text>
        <TextInput style={styles.input}
          placeholder="Enter Year/ Section"
          onChangeText={yearInputHandler}
          value={enteredYear}
        />
         <Text> Course </Text>
        <TextInput style={styles.input}
          placeholder="Enter Course"
          onChangeText={courseInputHandler}
          value={enteredCourse}
        />
        <Button title="Students" onPress={addGoalHandler} />
      </View>
             <Text style={styles.listtitle}> LIST OF STUDENTS </Text>
      <FlatList
        data={courseGoals}
        renderItem={({ item, index }) => (
          <View style={styles.goalContainer}>
          <View> 
          
          <TouchableOpacity onPress={() => deleteGoalHandler(index)}>
              <Text style={styles.clickableSize}>X</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity key={item.id} onPress={() => handleItemCLick(item)}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.text}>{item.sect}</Text>
            <Text style={styles.text}>{item.course}</Text>
            </TouchableOpacity>
            <View style={styles.edit}>
            <TouchableOpacity onPress={() => startEditingHandler(index)}>
              <Text style={styles.clickableSize}>Edit</Text>
            </TouchableOpacity>
            </View>
          </View>
        )
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  goalContainer: {
    paddingTop: 20,
    padding: 10,
    backgroundColor: "#add8e6",
    marginTop: 25,
    borderWidth: 2,
 
  },
  input: {
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 20,
      textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
  clickableSize: {
    fontSize: 20
  },
  edit: {
    alignSelf: 'flex-end',
    fontSize: 24,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#32cd32",
  },
  listtitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  }
});