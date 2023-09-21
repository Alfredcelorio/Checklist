import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeBaseProvider, Input, Box, Checkbox, Divider } from 'native-base';

function ChecklistApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const toggleTask = (task) => {
    setCompletedTasks((prevCompletedTasks) => {
      let newCompletedTasks;
      if (prevCompletedTasks.includes(task)) {
        newCompletedTasks = prevCompletedTasks.filter((t) => t !== task);
      } else {
        newCompletedTasks = [...prevCompletedTasks, task];
      }
      return newCompletedTasks;
    });
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
    setCompletedTasks(completedTasks.filter((task) => task !== taskToDelete));
  };

  const confirmDelete = (task) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteTask(task),
        },
      ],
      { cancelable: false }
    );
  };

  const uncheckAll = () => {
    setCompletedTasks([]);
  };

  return (
    <NativeBaseProvider>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Checklist Makers</Text>
        </View>
        <Divider my="2" bg="indigo.500" thickness={2} marginBottom={5} />
        <View style={styles.container}>
          <Box p={3}>
            {tasks.map((task, index) => (
              <Checkbox
                key={index}
                value={task}
                isChecked={completedTasks.includes(task)}
                onChange={() => toggleTask(task)}
                size="sm"
                color="white"
                marginLeft={60}
                marginTop={5}
                _text={{ color: 'white' }}
              >
                <TouchableOpacity onLongPress={() => confirmDelete(task)}>
                  <Text style={{ color: 'white' }}>{task}</Text>
                </TouchableOpacity>
              </Checkbox>
            ))}
          </Box>
          {/* New View to contain buttons and input */}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
            <Input
              size="xl"
              color="white"
              marginBottom={5}
              placeholder="New Task"
              placeholderTextColor="#E1E1E1"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={addTask}>
              <Text style={styles.addButton}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uncheckAll}>
              <Text style={styles.uncheckButton}>Uncheck All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blackBox}></View> 
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    paddingLeft: 36,
    paddingRight: 36,
    paddingBottom: 2,
    marginTop: 70,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  titleText: {
    color: '#F2F2F2',
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.165,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: 'black',
  },
  uncheckButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 0,
    marginBottom: 0,
  },
  // New style for buttonContainer
  buttonContainer: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  blackBox: {
    backgroundColor: 'black',
    height: 50, // or whatever height you want
    margin: 0,  // optional, for spacing
    borderRadius: 0, // optional, for rounded corners
  }  
});

export default ChecklistApp;
