export function login(factory, username, password)
{
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";
        let body = new FormData();

        body.append("factory", factory);
        body.append("password", password);
        body.append("idNumber", username);

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
                    return {
                        type : 'LOGIN_SUCCESS',
                        token : responseJson.token,
                    };
                }
            })
            .catch((error) => { return {type : 'LOGIN_FAILURE'}});
}

