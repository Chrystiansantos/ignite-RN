import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface ITaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export const TaskItem = ({ editTask, removeTask, task, index, toggleTaskDone }: ITaskItemProps) => {
  const [taskEdit, setTaskEdit] = useState(false);
  const [taskChange, setTaskChange] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)
  console.log(taskChange)
  useEffect(() => {
    if (textInputRef.current) {
      if (taskEdit) {
        textInputRef.current.focus();
        return;
      }
      textInputRef.current.blur();
    }
  }, [taskEdit])

  const handleStartEditing = () => {
    setTaskEdit(true);
  }

  const handleCancelEditing = () => {
    setTaskChange(task.title)
    setTaskEdit(false);
  }
  const handleSubmitEditing = (id: number) => {
    editTask(id, taskChange)
    setTaskEdit(false);
  }

  const abacaxi = (text: string) => {
    console.log(text);
    console.log(taskChange)
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskChange}
            onChangeText={setTaskChange}
            editable={taskEdit}
            onSubmitEditing={() => handleSubmitEditing(task.id)}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginRight: 15 }} /* style={styles.iconsContainer} */ >
        {taskEdit ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            {/* <Image source={editIcon} /> */}
            <Icon name="edit-2" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        )}

        <View
          style={styles.iconsDivider}
        />

        <TouchableOpacity
          disabled={taskEdit}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: taskEdit ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  conteinr: {},
  infoContainer: {},

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})