export const databaseUrl = process.env.VUE_APP_DATABASE_URL;
export const commentsUrl = process.env.VUE_APP_COMMENTS_URL;

export const messages = {
  error: {
    type: 'danger',
    title: 'Ошибка!',
    text: 'Произошла ошибка. Попробуйте повторить попытку позже!'
  },
  successSave: {
    type: 'primary',
    title: 'Успех!',
    text: 'Резюме успешно сохранено в базу!'
  },
  successRemove: {
    type: 'warning', 
    title: 'Резюме удалено!', 
    text: 'Резюме успешно удалено из базы!'
  }
};

export const loaderTime = 1000;