import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para el nombre del alumno, fecha de reserva, lista de alumnos, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [materia, setMateria] = useState('')
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [alumnos, setalumnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFechaReserva(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };

  // Función para agregar un nuevo alumno
  const agregaralumno = () => {
    // Genera un nuevo alumno con un ID único (incrementa el último ID generado)
    const nuevoalumno = { id: alumnos.length + 1, nombre: nombre, carnet: carnet, materia: materia, fechaReserva: fechaReserva };
    // Agrega el nuevo alumno a la lista de alumnos
    setalumnos([...alumnos, nuevoalumno]);
    // Limpia los campos de entrada
    setNombre('');
    setCarnet('');
    setMateria('');
    setFechaReserva(new Date());
    // Oculta el modal de agregar alumno
    setModalVisible(false);
  };

  // Función para eliminar un alumno
  const eliminaralumno = (id) => {
    // Filtra la lista de alumnos para excluir el alumno con el ID dado
    setalumnos(alumnos.filter((alumno) => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar alumno */}
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} 
      color="black"/>
      {/* Modal de agregar alumno */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del alumno */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del Alumno"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Código del Alumno"
              value={carnet}
              onChangeText={setCarnet}
              keyboardType="numeric"

            />
            <TextInput
              style={styles.input}
              placeholder="Materia favorita del Alumno"
              value={materia}
              onChangeText={setMateria}
            />
            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity onPress={showDatepicker}><Text>Fecha nacimiento</Text></TouchableOpacity>
            {/* Muestra la fecha seleccionada */}
            <Text>selected: {fechaReserva.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el alumno */}
            <Button title="Agregar Alumno" onPress={agregaralumno}/>
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de alumnos */}
      <FlatList
        data={alumnos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.alumnoItem}
            onPress={() => eliminaralumno(item.id)}
          >
            
            {/* Muestra el ID, nombre y fecha de reserva del alumno */}
            <Text style={styles.alumnoNombre}>{item.id}</Text>
            <Text style={styles.alumnoNombre}>{item.nombre}</Text>
            <Text style={styles.alumnoNombre}>{item.carnet}</Text>
            <Text style={styles.alumnoNombre}>{item.materia}</Text>
            <Text style={styles.alumnoFecha}>
              Fecha de Reserva: {item.fechaReserva.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada alumno como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D8519',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  alumnoItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop:5
  },
  alumnoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alumnoFecha: {
    fontSize: 16,
  },
});

export default App;
