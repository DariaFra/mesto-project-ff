export const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
    headers: {
      authorization: "710148f6-ab5d-49c8-b9e8-391a6f602323",
      "Content-Type": "application/json",
    }
};

const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export function getInitialCard() {
    return fetch (`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(handleResponse)
}

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(handleResponse)  
} 

export const editUser = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    })
    .then(handleResponse)
}

export const addNewCard = (card) => {
    return fetch(`${config.baseUrl}/cards `, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify ({
            name: card.name,
            link: card.link
        })
    })
    .then(handleResponse)
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }) 
    .then(handleResponse)
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
        {
        method: 'PUT',
        headers: config.headers
    }
)
    .then(handleResponse)
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return res.json()
    })
}

export const updateAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: data
        })
    })
    .then(handleResponse)
}