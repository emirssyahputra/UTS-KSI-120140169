import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.containerhome}>
      <Text style={styles.title}>Keep ! </Text>
      <TouchableOpacity onPress={() => navigation.navigate('ToDoList')}>
        <Text style={styles.button}>To Do List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.button}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}
function ProfilScreen() {
  return (
    <ImageBackground 
        style={styles.background} 
        source={require("./assets/bg3.jpg")}>
       <View style={styles.body}>
       <Image source={require("./assets/foto.png")} style={styles.gambar}/>
       <View style={styles.nama}>
       <Text>Nama   : Emirssyah Putra</Text>
       <Text>NIM    : 120140169</Text>
       <Text>Kelas  : RA</Text>
       </View>
       </View>
        </ImageBackground>
  );
}

function ToDoListScreen() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadTodos() {
      const savedTodos = await AsyncStorage.getItem('@todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
    loadTodos();
  }, []);

  useEffect(() => {
    async function saveTodos() {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos));
    }
    saveTodos();
  }, [todos]);

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo('');
  };
  
  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todo}
          onChangeText={text => setTodo(text)}
          placeholder="Tambahkan Catatan Baru"
        />
        <TouchableOpacity onPress={addTodo}>
          <Text style={styles.button}>Tambah</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todoList}>
        {todos.map((item, index) => (
          <View key={index} style={styles.todoItem}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => deleteTodo(index)}>
              <Text style={styles.deleteButton}>Hapus</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ToDoList" component={ToDoListScreen} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerhome: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
  todoList: {
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    color: '#f00',
  },
  background: {
    flex:1,
    flexDirection:"column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  top: {
    top:50,
    height:10,
    width:350,
},
Text: {
    top:-30,
    left:40,
    height:50,
    width:350,
    fontSize:20,
},
body: {
    flex: 1,
},
gambar: {
    top:160,
    height:210,
    width:170,
},
nama:{
top:200,
alignItems:"center",
fontSize: 50,
backgroundColor:"lightgreen",
padding:10,
borderRadius:10,
}
});