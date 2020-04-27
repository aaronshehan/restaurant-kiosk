import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TableCard from '../../components/TableCard';
import firestore from '@react-native-firebase/firestore';
import {getDailyRevenue} from './revenue';
import {getMonthlyRevenue} from './revenue';
import {getQuestionDocs} from './revenue';

 export default class MetricsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: [],
            dailyQuery: [],
            questionQuery: [],
        }
    }

  getMonth = async () => {
     let tempData = await getMonthlyRevenue()
       .then(data => {
         this.setState({ query : data })
         console.log(data);
       })
       .catch(error => {
         console.error(error)
       })
   }

   getQ = async () => {
      let tempData = await getQuestionDocs()
        .then(data => {
          this.setState({ questionQuery : data })
          console.log(data);
        })
        .catch(error => {
          console.error(error)
        })
    }

  getDaily = async () => {
       let tempData = await getDailyRevenue()
         .then(data => {
           this.setState({ dailyQuery : data })
           console.log(data);
         })
         .catch(error => {
           console.error(error)
         })
   }

   render () {

  {this.getMonth()}
  {this.getDaily()}
  {this.getQ()}

  const mapMonth = this.state.query.map(index => {
     return (
     <View style={styles.employeeContainer}>
          <Text style={styles.header}>
            MONTHLY REVENUE {index.year}
          </Text>
          <Text style={styles.menuText}>
            January: {index.January}
          </Text>
          <Text style={styles.menuText}>
            February: {index.February}
          </Text>
          <Text style={styles.menuText}>
            March: {index.March}
          </Text>
          <Text style={styles.menuText}>
            April: {index.April}
          </Text>
          <Text style={styles.menuText}>
            May: {index.May}
          </Text>
          <Text style={styles.menuText}>
            June: {index.June}
          </Text>
          <Text style={styles.menuText}>
            July: {index.July}
          </Text>
          <Text style={styles.menuText}>
            August: {index.August}
          </Text>
          <Text style={styles.menuText}>
            September: {index.September}
          </Text>
          <Text style={styles.menuText}>
            October: {index.October}
          </Text>
          <Text style={styles.menuText}>
            November: {index.November}
          </Text>
          <Text style={styles.menuText}>
            December: {index.December}
          </Text>
     </View>

      )
  })

    const mapDaily = this.state.dailyQuery.map(index => {
       return (
            <View style={styles.employeeContainer2}>
                <Text style={styles.header}>
                  DAILY REVENUE
                </Text>
                <Text style={styles.menuText}>
                  April 21: {index.April}
                </Text>
            </View>
        )
    })

    const mapQuestions = this.state.questionQuery.map(index => {

    let questionArray  = index.questions;
    let answerArray = index.reviews;

    let iterator = questionArray.length;


       return (
       <View style={styles.employeeContainer}>
           <Text style={styles.answer}>
               Question: {questionArray[0]}
           </Text>
           <Text style={styles.answer}>
               Answer: {answerArray[0]}
           </Text>
           <Text style={styles.answer}>
               Question: {questionArray[1]}
           </Text>
           <Text style={styles.answer}>
               Answer: {answerArray[1]}
           </Text>
           <Text style={styles.answer}>
               Question: {questionArray[2]}
           </Text>
           <Text style={styles.answer}>
               Answer: {answerArray[2]}
           </Text>
        </View>
          )
       })

  return (

  <View style={styles.background}>
    <ScrollView>
                 <Text style={styles.header}>
                    REVENUE
                 </Text>
             {mapMonth}
             {mapDaily}

             <Text style={styles.header}>
                FEEDBACK
             </Text>
             {mapQuestions}
    </ScrollView>
  </View>
  );
 }
}

const styles = StyleSheet.create({

    header: {
        fontSize: 26,
        color: '#ffff9f',

    },

    answer: {
        fontSize: 26,
        color: '#66cc00',

    },

    input: {
                height: 95,
                marginBottom: 10,
                color: 'white',
                fontSize: 21,
                paddingHorizontal: 10
    },

    background: {
            flex: 1,
            backgroundColor: '#3498db',
            alignItems: 'center'
        },

        removeEmployeeButton: {
            alignSelf: 'stretch',
            height: 40,
            alignItems: 'center',
            backgroundColor: '#ff6600',
            margin: 10
        },

    menuText: {
        fontSize: 22,
        color: '#ffffff',
    },

     employeeContainer2:
     {
         backgroundColor: '#3333ff',
         height: 140,
         width: 800,
         alignItems: 'flex-start',
         justifyContent: 'space-around',
         margin: 20,
         padding: 18
     },

    employeeContainer:
    {
        backgroundColor: '#3333ff',
        height: 400,
        width: 800,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        margin: 20,
        padding: 18
    },

    employeeContainerText:
    {
        fontSize: 24,
        color: '#ffffff',

    },

    scrollView:
    {
        backgroundColor: '#ffffff',
        paddingLeft: 400,
        alignItems: 'center'
    },
})