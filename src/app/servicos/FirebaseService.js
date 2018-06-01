import { firebaseDatabase, firebaseAuth } from '../utils/firebaseUtils'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 30) => {
        let query = firebaseDatabase
            .ref(nodePath)
            .orderByChild('updated')
            .limitToLast(size);

        query.on('value', dataSnapshot => {
            let items = [];

            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });

            callback(items.reverse());
        });

        return query;
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;

        ref.set(objToSubmit);

        return id;
    };

    static updateData = (id, node, obj) => {
        return firebaseDatabase.ref(node + '/' + id).set({
            ...obj
        });
    };

    static remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };

    static onAuthStateChanged = (fn) => {
        return firebaseAuth.onAuthStateChanged(fn);
    }

    static currentUser = () => {
        return firebaseAuth.currentUser;
    }
}