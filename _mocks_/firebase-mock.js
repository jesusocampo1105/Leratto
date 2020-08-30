const firestore = () => {
    return {
        collection: (nameCollection) => {
            return {
                doc: (newDocument) => {
                    return {
                        add: (objData) => {
                            return new Promise((resolve) => {
                                resolve('El post fue agregado')
                            })
                        }
                    }
                }
            }
            
        }
    }
}


const firebase = {
    firestore: firestore
}

export default jest.fn(() => {
    return firebase;
})