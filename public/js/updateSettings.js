/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
export const updateSettings = async (data, type) => {
    const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
    try {
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });
        // console.log(res.data.status);
        if(res.data.status === 'Success') {
            showAlert('success', `${type.toUpperCase()} updated successfully`);
            // windows.setTimeout(() => {
            //     location.reload();
            // }, 1500);
        }
    } catch(err){
        showAlert('error', err.response.data.message);
    }
}