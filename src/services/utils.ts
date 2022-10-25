import { toast, ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const copyTextToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('ID copiado com sucesso!', toastOptions);
    })
    .catch(() => {
      toast.error('Ocorreu um erro ao copiar o ID!', toastOptions);
    });
};

export const factStatus = [
  'PENDING',
  'APPROVED',
  'DENIED',
];
