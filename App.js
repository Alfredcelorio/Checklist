import React, { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Box, Button, Input, NativeBaseProvider } from 'native-base';
import { ProgressCircle } from 'react-native-svg-charts';

const TaskProgressChart = ({ completedTasks, totalTasks }) => {
    const percentageCompleted = (completedTasks / totalTasks) * 100;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:100, marginTop:100}}>
        <ProgressCircle
            style={{ height: 400, width: '100%'  }}
            progress={percentageCompleted / 100}
            progressColor='green'
        />
        <Text style={styles.percentageText}>
            {`${percentageCompleted.toFixed(2)}%`}
        </Text>
    </View>
    );
};

const initialTasks = [
    { key: '1', label: 'Buy groceries', completed: false },
];

export default function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState('');
    const [editingKey, setEditingKey] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const completedTasks = tasks.filter(task => task.completed).length;
    const unmarkedTasks = tasks.length - completedTasks;



    const toggleCompletion = (key) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.key === key ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const addNewTask = () => {
        if (newTask.trim().length > 0) {
            setTasks(prevTasks => [
                ...prevTasks,
                { key: Date.now().toString(), label: newTask, completed: false }
            ]);
            setNewTask('');
        }
    };

    const deleteTask = (key) => {
        setTasks(prevTasks => prevTasks.filter(task => task.key !== key));
    };

    const startEditing = (key, label) => {
        setEditingKey(key);
        setEditingValue(label);
    };

    const finishEditing = () => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.key === editingKey ? { ...task, label: editingValue } : task
            )
        );
        setEditingKey(null);
        setEditingValue('');
    };

    const renderLeftActions = (progress, dragX, item) => {
        return (
            <Box flexDirection="row" height={50} backgroundColor="black">
                <TouchableOpacity onPress={() => startEditing(item.key, item.label)} style={styles.editBox}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.deleteBox}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </Box>
        );
    };

    const percentageCompleted = (completedTasks / tasks.length) * 100;


    const renderItem = ({ item, drag, isActive }) => {
        if (editingKey === item.key) {
            return (
                <TextInput
                    style={styles.input}
                    value={editingValue}
                    onChangeText={setEditingValue}
                    onBlur={finishEditing}
                    autoFocus
                />
            );
        }
   
        


        return (
            <Swipeable renderRightActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}>
                <TouchableOpacity
                    onLongPress={drag}
                    onPress={() => toggleCompletion(item.key)}
                    style={[
                        styles.rowItem,
                        { backgroundColor: isActive ? "red" : item.completed ? 'green' : 'black' },
                    ]}
                >
                    <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
            </Swipeable>
        );
    };

    return (
        <NativeBaseProvider>
            <GestureHandlerRootView style={styles.container}>
                <Box backgroundColor="black" height={100} width="100%"></Box>
                <Box alignItems="center" style={styles.footer}>
                    <Input mx="5" placeholder="Enter new task." w="100%" value={newTask} marginBottom={5} onChangeText={setNewTask} />
                    <Button onPress={addNewTask} style={styles.addButton}>Add Task</Button>
                </Box>
                <TaskProgressChart completedTasks={completedTasks} totalTasks={tasks.length} />     
                <View style={styles.taskListContainer}>
                    <DraggableFlatList
                        data={tasks}
                        onDragEnd={({ data }) => setTasks(data)}
                        keyExtractor={(item) => item.key}
                        renderItem={renderItem}
                        contentContainerStyle={{ backgroundColor: 'black' }}
                    />
                </View>
            </GestureHandlerRootView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    percentageText: {
        position: 'absolute',
        fontSize: 50,
        color: "white",
        fontWeight: 'bold',
        textAlign: "center",
        
    },

    rowItem: {
        height: 50,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    footer: {
        paddingBottom: 10,
        backgroundColor: 'black',
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 18,
    },
    deleteBox: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
    },
    deleteText: {
        color: 'white',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    editBox: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
    },
    editText: {
        color: 'white',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'black',
    },
    addButton: {
        width: '95%',
        alignSelf: 'center',
        marginBottom: 20
    },
    taskListContainer: {
        flex: 1,
  },


});

