import view from './post.html';
import './estilos-post.scss';
import '../firebase-functions/firebaseConfig';
import { savePost } from '../firebase-functions/firebaseStore';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const postForm = divElement.querySelector('#post-form');

  // El estado para editar el post es false porque al empezar la vista nuestro
  // formulario no se va actualizar todavía

  const editPostStatus = false;
  const id = '';

  // Cuando la ventana cargue, traer el contenido del DOM, se ejecuta el evento de getEditPosts

  // const btnEdit = postContainer.querySelectorAll('.btn-edit');

  //   btnEdit.forEach((btn) => {
  //     btn.addEventListener('click', async (e) => {
  //       try {
  //         const doc = await getEditPost(e.target.dataset.id)
  //         const post = doc.data();
  //         postForm['post-title'].value = post.title;
  //         postForm['post-description'].value = post.description;

  //         //El estado del post es true porque ya lo vamos a editar
  //         editPostStatus = true;
  //         id = doc.id;
  //         postForm['btn-post-form'].innerText = 'Actualizar';

  //       } catch (error) {

  //       }
  //     });
  //   });
  // });

  const userLocalStorage = localStorage.getItem('userSession');
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.uid;
  const userName = convertObjJson.displayName;
  const userPhotoURL = convertObjJson.photoURL;

  const userNameDom = divElement.querySelector('#post-user-name'); 
  const userPhotoDom = divElement.querySelector('#post-user-photo');

  userNameDom.textContent = `${userName}`;
  userPhotoDom.src = `${userPhotoURL}`;

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log(convertObjJson);
    
    // Capturar el nombre y la descripción del restaurante
    const title = postForm['post-title'];
    const description = postForm['post-description'];
    const typeOfFood = postForm['post-type-food'];
    const price = postForm['post-price'];
    const quality = postForm['post-quality'];
    const location = postForm['post-location'];


    try {
      // Si no se esta editando el post, realiza la promesa
      // if (!editPostStatus){
      await savePost(userId, userName, userPhotoURL, title.value, description.value, typeOfFood.value, price.value, quality.value, location.value);
      // } //Si se edita el post
      // else {
      //     await updatePost(id, {
      //       title: title.value,
      //       description: description.value,
      //     })

      //     editPostStatus = false;
      //     id = '';
      //     postForm['btn-post-form'].innerText = 'Publicar';
      // };

      // await getPosts();
      postForm.reset();
      window.location.hash = '#/home';
    } catch (error) {
      alert(error);
    }
  });

  return divElement;
};