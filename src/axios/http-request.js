import qs from 'qs';
import axios from './http.conf';

const { post } = axios;

export default {
    postAuth() {
        const params = {
            appId: '9bf0504ca66543428d749ffcbb08114f',
            appKey: 'd56c11b1c0364b489547ff67a6e973ca',
        };
        return post('/auth/login', qs.stringify(params));
    },

    postProduct(headers, data = {}) {
        return post('/product-v001/getProducts', data, { headers });
    },

    postDevice(headers) {
        return post(
            '/device-v001/batchDevices',
            { appId: '652189223293550592' },
            { headers }
        );
    },

    getDeviceDataHistory(headers) {
        headers = { ...headers, 'Content-Type': 'application/json' };
        return post(
            '/device-v001/getDeviceDataHistory',
            {
                deviceKey: headers.deviceKey,
                pageSize: 1,
            },
            { headers }
        );
    },
};
