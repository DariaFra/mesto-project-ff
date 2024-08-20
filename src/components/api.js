export const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
    headers: {
      authorization: "710148f6-ab5d-49c8-b9e8-391a6f602323",
      "Content-Type": "application/json",
    }
};

const response = (res) => {
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
    .then(response)
}

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(response)  
} 

export const editUser = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    })
    .then(response)
}

export const addNewCard = (card) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards `, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify ({
            name: card.name,
            link: card.link
        })
    })
    .then(response)
}

export const deleteCard = (cardId) => {
    console.log(cardId)
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }) 
    .then(response)
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
        {
        method: 'PUT',
        headers: config.headers
    }
)
    .then(response)
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
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: data
        })
    })
    .then(response)
}