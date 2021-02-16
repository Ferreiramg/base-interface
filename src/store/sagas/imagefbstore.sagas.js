import { takeLatest, put, take, call } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';
import * as Type from 'utils/constants/actionTypes';
import firebase from 'firebase/app';
import 'firebase/storage';
import * as config from "utils/constants/config"

const firebaseApp = firebase.initializeApp(config);

const storage = firebaseApp.storage();

function uploadFileChannel(file) {
    return eventChannel(emittter => {
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on("state_changed",
            snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                emittter({ progress });
            },
            error => {
                emittter({ error });
            },
            () => {
                storage.ref('images')
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        emittter({ url });
                    });
            });
        return () => {
            uploadTask.off("state_changed");
        }
    });
}

function* storeImage({ file }) {

    const channel = yield call(uploadFileChannel, file);
    while (true) {
        const { progress = 0, error, url } = yield take(channel, buffers.sliding(5));
        if (error) {           
            yield put({ type: Type.STORE_IMAGE_FAILURE, payload: error })
            channel.close();
            return;
        }
        if (url) {
            yield put({ type: Type.STORE_IMAGE_SUCCESS, payload: url });
            return;
        }
        yield put({ type: Type.UPLOAD_IMAGE_PROGRESS, payload: progress });
    }
}

export function* watcherSaga() {
    yield takeLatest(Type.CAPTURE_IMAGE, storeImage);
}