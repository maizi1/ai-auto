import axios from 'axios';
import { Modal } from 'antd';

const { error: ModalError } = Modal;

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://irs-nginx.ccsyun.club'

axios.interceptors.response.use(
    response => {
        if (response.data.code !== 200) {
            ModalError('请求异常 !!!');
            return null;
        }
        return response;
    },
    error => {
        // 对响应错误做点什么
        const { response } = error;
        if (response) {
            switch (response.status) {
                case 404:
                    break;
                case 500:
                    ModalError({ content: '服务器异常 !!!' });
                    break;
                default:
                    ModalError({ content: '未捕获的错误 !!!' });
            }
        }

        return Promise.resolve(null);
    }
);

export default axios;
