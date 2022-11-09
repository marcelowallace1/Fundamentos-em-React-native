
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { styles } from "./styles"
import { Participant } from '../../components/Participant';


export default function Home() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  {/* funcao para adicionar um participante */ }
  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Ja existe um participante com este nome na lista")
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  {/* funcao para remover um participante */ }
  function handleParticipantRemove(name: string) {

    Alert.alert("remover", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Nao',
        style: 'cancel'
      }

    ])
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName} >
        Nome do evento
      </Text>
      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022,
      </Text>

      {/* view criada para mudar o flex direction */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor={'#6B6B6B'}
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* usando FlatList para a rolagem */}

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={(
          <Text style={styles.listEmptyText}>
            Adicione os participantes a sua lista de presença
          </Text>
        )}
      />
      {/* usando ScrollView para a rolagem
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        participants.map(participant => (
          <Participant 
          key={participant}
          name={participant}
          onRemove={() => handleParticipantRemove("participant")} />
        ))
      }
    </ScrollView>
      */}
    </View>
  )
}