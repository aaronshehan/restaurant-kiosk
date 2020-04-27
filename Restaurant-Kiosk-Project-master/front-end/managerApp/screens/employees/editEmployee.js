import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export default class EmployeeManangement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: [],
        }
    }

    OnUpdate = async (empID, newData) => {
        const updateEmp = { empID, newData }
        // Backend function call.
        let completion = await updateEmployeeInformation(updateEmp)
        /* This is in function so that when the user clicks 'Ready'
         the order will disappear from the screen.*/
        let newEmpDetails = await getEmployees(this.props.id).then(
          emp1 => {
            this.setState({ orderDetails: emp1 }, function () {
              console.log(this.state.orderDetails);
            })
          }
        )
      }





    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [DOB, setDOB] = useState('');

    const _onNewEmployeePressed = () => {

            if (name === '') return alert('Enter Name');
            if (email === '') return alert('Enter Email');
            if (password === '') return alert('Enter Password');
            if (role === '') return alert('Enter Role');
            if (DOB === '') return alert('Enter DOB');

            const employee = {
                dob: DOB,
                email: email,
                hourlyRate: 15.5,
                id: '',
                name: name,
                password: password,
                role: role,
            }

            addEmployee(employee);
    }

    async function addEmployee(employee) {

        let isSuccess;
        let validEmail = true;

        await firebase.firestore().collection('Employees').where('email', '==', employee.email).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                validEmail = true;
            }

        })
        .catch (error => {
            console.log('error getting doc', error);
        });
        if(validEmail==false)
        {
            console.log('Email already exists');
            let emailExist = 'Email already exists'
            return emailExist
        }


        let autoID = firebase.firestore().collection('Employees').doc().id;

        employee.id = autoID;

        await firebase.firestore().collection('Employees').doc(autoID).set(employee)
        .then(() => {
            console.log("Employee added Successfully");
            isSuccess = true;
            alert('New employee added');
        })
        .catch((error) => {
            console.error("Error adding Employee to Employee table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }



        return (
            <View style={styles.container}>

                <TextInput
                placeholder="Employee Name"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setName(val)}
                value={name}
                />

                <TextInput
                placeholder="Email"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setEmail(val)}
                value={email}
                />

                <TextInput
                placeholder="Password"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                secureTextEntry= {true}
                onChangeText={(val) => setPassword(val)}
                value={password}
                />

                <TextInput
                placeholder="Role"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setRole(val)}
                value={role}
                />

                 <TextInput
                 placeholder="DOB (MM/DD/YYYY)"
                 placeholderTextColor='rgba(255,255,255,0.7)'
                 style={styles.input}
                onChangeText={(val) => setDOB(val)}
                value={DOB}
                 />


                <Button
                style={styles.addPosition}
                title="Register" onPress = {_onNewEmployeePressed}>
                </Button>
            </View>
        );
    }


export default SignUp;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 60,
        backgroundColor: 'gray',
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10
    },

})