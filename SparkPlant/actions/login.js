import * as types from './types';

function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function fetchLogin(factory, username, password)
{
    return dispatch => {
        dispatch(loginRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";
        let body = new FormData();

       /* body.append("factory", factory);
        body.append("password", password);
        body.append("idNumber", username);*/

        body.append("factory", "1");
        body.append("password", "test");
        body.append("idNumber", "user1");

        fetch(baseUrl + "/token", {
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
                    dispatch(loginSuccess(responseJson));
                    dispatch(goToHomepage());
                }
            })
            .catch((error) => { dispatch(loginFailure())});
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

export function loginSuccess(response)
{
    return {
        type: types.LOGIN_SUCCESS,
        token: parseJwt(response.token),
        tokenString : response.token,
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