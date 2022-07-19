import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'space-between'
    },
    imgStyle: {
        height: moderateScale(200),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextStyle: {
        fontSize: scale(32),
        color: 'white',
        fontWeight: 'bold'
    },
    mainStyle: {
        paddingHorizontal: moderateScale(24),
        paddingTop: moderateVerticalScale(44)
    },
    forgotView: {
        alignSelf: 'flex-end',
        marginVertical: moderateVerticalScale(24)
    },
    forgotText: {
        fontSize: scale(16),
        color: colors.themeColor,
        fontWeight: '400',
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateVerticalScale(72),
        justifyContent: 'center',
        marginBottom:moderateVerticalScale(40)
    },
    containers: {
        justifyContent: 'center',
        position: 'absolute',
        top: 200,
        left: 20,
        width: '90%',
        backgroundColor: '#fff',
        zIndex: 1,
        padding: 20,
        borderRadius: 18,
      },
      inputContainer: {
        borderBottomColor: 'gray',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.5,
        width: "90%",
        height:moderateVerticalScale(45),
    
      },
      mainContainer:{
        backgroundColor: colors.themeColor,
        alignItems: 'center', 
        justifyContent: 'center',
        height: '50%',
        width: '100%',
         marginBottom:moderateVerticalScale(10)
      },
      titleStyle:{
        fontSize: scale(30),
        color:'white',
        fontWeight:'bold',
        marginBottom:moderateVerticalScale(80)
      },
      titleStyle2:{
        fontSize: scale(30),
        color:'white',
        fontWeight:'bold',
      },
      titleStyle1:{
        fontSize: scale(25),
        color:colors.blackOpacity50,
        fontWeight:'bold',
        alignSelf:'center',
        marginBottom:moderateVerticalScale(20)
      },
      forgotStyle1:{
        fontSize: scale(12),
        color:colors.blackOpacity50,
        fontWeight:'bold',
        // alignSelf:'center',
        textDecorationLine: "underline",
        marginBottom:moderateVerticalScale(20)
      }
});

export default styles