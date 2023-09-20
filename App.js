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
    console.log("Toggling task: ", task);

    setCompletedTasks((prevCompletedTasks) => {
      console.log("Current completedTasks: ", prevCompletedTasks);

      let newCompletedTasks;
      if (prevCompletedTasks.includes(task)) {
        newCompletedTasks = prevCompletedTasks.filter((t) => t !== task);
      } else {
        newCompletedTasks = [...prevCompletedTasks, task];
      }

      console.log("New completedTasks: ", newCompletedTasks);
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

  return (
    <NativeBaseProvider>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Checklist Makers</Text>
        </View>
        <Divider my="2" bg="indigo.500" thickness={2} marginBottom={5} />
        <View style={styles.container}>
          <Box p={3}>
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
        </View>
      </ScrollView>
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
});

export default ChecklistApp;
