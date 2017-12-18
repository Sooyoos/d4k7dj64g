import * as types from './types';
import { tryUser } from './users';
import { tryUserNews } from './news';
import { goToLogin } from './navigation/login';
import Base64 from 'base-64';
import { AsyncStorage, Platform } from 'react-native';

function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Base64.decode(base64));
};

export function storeLogin(data)
{
    AsyncStorage.getItem('@SparkPlant:previousUsers', (err, result) => {
        let list = JSON.parse(result);
        let flag = false;

        if(list !== null)
        {
            for(var i = 0; i < list.length; i++)
            {
                if(list[i].username === data.username)
                {
                    flag = true;
                }
            }

            if(flag === false)
            {
                if(list.length === 5)
                {
                    list.pop();
                }

                list.unshift(data);
                AsyncStorage.setItem('@SparkPlant:previousUsers', JSON.stringify(list), (err, result) => {
                    console.log('Previous users list saved');
                });
            }
        }
        else
        {
            list = [];
            list.unshift(data);
            AsyncStorage.setItem('@SparkPlant:previousUsers', JSON.stringify(list), (err, result) => {
                console.log('Previous users list saved');
            });
        }
    })
}

function manageFirebaseToken(tokenString)
{
    var DeviceInfo = require('react-native-device-info');

    console.log(DeviceInfo);
    let token;

    // get platform
    let platorm = Platform.OS;

    // get device id
    let deviceId = DeviceInfo.getUniqueID();

    // get firebase token
    Firebase.messaging().getToken().then((data) => {
        token = data;

        // send it to the api

        fetch(types.baseUrl + "/devices", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + tokenString,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                platform : platorm,
                deviceId : deviceId,
                token : data,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                Firebase.messaging().onMessage(
                    (data) => {
                        console.log(data);
                    }
                );
            })
            .catch((error) => { console.log(error); dispatch(loginFailure())});


    });

}

function fetchLogin(factory, username, password)
{
    return dispatch => {
        dispatch(loginRequested());
        let body = new FormData();

        body.append("factory", factory);
        body.append("password", password);
        body.append("idNumber", username);

        fetch(types.baseUrl + "/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
            body: body,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.token)
                {
                    let data = {factory : factory, username : username, password : password};
                    dispatch(goToHomepage());
                    dispatch(loginSuccess(responseJson, data));
                }
                else
                {
                    dispatch(goToLogin());
                    dispatch(loginFailure());
                }
            })
            .catch((error) => { console.log(error); dispatch(loginFailure())});
    }

}

export function tryLogin(factory, username, password){
    return (dispatch, getState) => {
        return dispatch(fetchLogin(factory, username, password));
    }
}

function loginRequested()
{
    return {
        type : types.LOGIN_REQUESTED,
    }
}

function sendLoginSuccessResponse(response)
{
    return {
        type: types.LOGIN_SUCCESS,
        token: parseJwt(response.token),
        tokenString : response.token,
    }
}

export function loginSuccess(response, data)
{
    return dispatch => {
        //dispatch(tryUserNews({tokenString : response.token}));
        dispatch(tryUser(parseJwt(response.token), response.token, data));
        dispatch(sendLoginSuccessResponse(response));
    }
}

export function loginFailure()
{
    return {
        type: types.LOGIN_FAILURE,
    }
}

export function setLoginFactory(factory)
{
    return {
        type: types.SET_LOGIN_FACTORY,
        factory : factory,
    }
}

export function setLoginUsername(username)
{
    return {
        type: types.SET_LOGIN_USERNAME,
        username : username,
    }
}

export function setLoginPassword(password)
{
    return {
        type: types.SET_LOGIN_PASSWORD,
        password : password,
    }
}

function goToHomepage()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'HomeTab',
    };
}

function fetchPreviousLogin()
{
    return dispatch => {
        dispatch(previousLoginRequested());
        try{
            AsyncStorage.getItem('@SparkPlant:previousUsers', (err, result) => {
                console.log(JSON.parse(result));
                dispatch(previousLoginSuccess(result));
            })
        }
        catch(error)
        {
            dispatch(previousLoginFailure())
        }
    }
}

function previousLoginRequested()
{
    return {
        type : types.PREVIOUS_LOGIN_REQUESTED,
    }
}

export function previousLoginSuccess(response)
{
    return {
        type: types.PREVIOUS_LOGIN_SUCCESS,
        previousUsers : JSON.parse(response)
    }
}

export function previousLoginFailure()
{
    return {
        type: types.PREVIOUS_LOGIN_FAILURE,
    }
}

export function tryPreviousLogin(){
    return (dispatch, getState) => {
        return dispatch(fetchPreviousLogin());
    }
}
function logoutRequested()
{
    return {
        type: types.LOGOUT,
    }
}

export function resetLoginError()
{
    return {
        type: types.RESET_LOGIN_ERROR,
    }
}

export function logout()
{
    return (dispatch, getState) => {
        dispatch(logoutRequested());
        dispatch(goToLogin())
    }
}

