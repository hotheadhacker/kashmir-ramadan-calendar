import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const CalendarScreen = () => {
  const [agendaData, setAgendaData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/hotheadhacker/json-data/main/ramdan-2024.json'
      );
      const data = await response.json();
      const formattedData = formatData(data);
      setAgendaData(formattedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const formatData = (data) => {
    const formattedData = {};
    Object.keys(data.data).forEach((date) => {
      const formattedDate = formatDate(date);
      formattedData[formattedDate] = [
        { day: data.data[date].day, iftar: data.data[date].iftar, sehri: data.data[date].sehri }
      ];
    });
    return formattedData;
  };

  const formatDate = (dateString) => {
    // Assuming dateString is in the format "dd-mm-yyyy"
    const parts = dateString.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={agendaData}
        renderItem={(item) => {
          return (
            <View style={{ padding: 20, backgroundColor: '#d7dde0', margin: 10, borderRadius: 10 }}>
              <Text style={{color: 'orange', fontSize: 17}}>Day: {item.day}</Text>
              <Text style={{color: 'black', fontSize: 20, fontStyle: 'italic'}}>Sahar: {item.sehri} AM</Text>
              <Text style={{color: 'black', fontSize: 20, fontStyle: 'italic'}}>Iftar: {item.iftar} PM</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CalendarScreen;

