/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapBox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
// DOM ELEMENT
const loginForm = document.querySelector('.form--login');
const updateForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
const logoutBtn = document.querySelector('.nav__el--logout');
const mapBox = document.getElementById('map');
const bookBtn = document.getElementById('book-tour');
// DELEGATION
if(mapBox){
    const locations = JSON.parse(mapBox.dataset.locations);
    console.log(locations);
    displayMap(locations);
}

if(loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}
if(logoutBtn){
    logoutBtn.addEventListener('click', logout)
}

if(updateForm){
    updateForm.addEventListener('submit', async e => {
        e.preventDefault();
        console.log(document.getElementById('photo').files[0]);
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        // console.log(form);
        await updateSettings(form, 'data');
    })
}

if(updatePasswordForm){
    updatePasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--save--password').textContent = 'Updating...';
        const oldPassword = document.getElementById('oldPassword').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        await updateSettings({ oldPassword, password, passwordConfirm }, 'password');
        document.querySelector('.btn--save--password').textContent = 'Save Password';
        document.getElementById('oldPassword').value = '';
        document.getElementById('password').value = '';
        document.getElementById('passwordConfirm').value = '';
    })
}

if(bookBtn){
    bookBtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...';
        const { tourId } = e.target.dataset;
        bookTour(tourId);
    })
}