import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export async function validateCoupon(couponCode) {
  let validCoupon;
  let coupon;
  
  await firebase.firestore().collection('Coupons').where('code', '==', couponCode).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            validCoupon = false;
        }  
        else {
          validCoupon = true;
          coupon = snapshot.docs.map(doc => doc.data());
        }
    })
    .catch ((error) => {
        validCoupon = false;
        console.log('error validating coupon', error);
    });
    
    if (!validCoupon) {
        return false;
    }
   
    
    return coupon[0].percentOff;
}



export async function addCoupon(discount) {
   let isSuccess;
   let autoID = firebase.firestore().collection('Coupons').doc().id;

   await firebase.firestore().collection('Employees').doc(autoID).set({code: autoID, percentOff: discount})
    .then(() => {
        console.log("Coupon added Successfully");
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error adding Coupon to table: ", error);
        isSuccess = false;
    });
   

    return isSuccess;
}
