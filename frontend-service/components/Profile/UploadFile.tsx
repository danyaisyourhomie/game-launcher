import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import MyButton from '../Button';
import { ButtonTypes } from '../../common/enum/ButtonTypes';
import { AuthContext } from '../../context/AuthProvider';
import { uploadCape, uploadSkin } from '../../api';

import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minWidth: '380px',
    textAlign: 'center',
    backgroundColor: 'var(--background-primary-color)',
    color: 'var(--text-primary-color)',
  },
  '& .MuiDialogActions-root': {
    backgroundColor: 'var(--background-primary-color)',
    color: 'var(--text-primary-color)',
  },

  '& .MuiPaper-root': {
    borderRadius: ' 15px',
    overflow: 'hidden',
    border: 'none',
    background: 'unset',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function UploadFile() {
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { user } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);

  const [selectedSkin, setSelectedSkin] = React.useState();
  const [selectedCape, setSelectedCape] = React.useState();

  const [isSkinPicked, setIfSkinPicked] = React.useState(false);
  const [isCapePicked, setIfCapePicked] = React.useState(false);

  const changeHandlerSkin = (event) => {
    setSelectedSkin(event.target.files[0]);
    setIfSkinPicked(true);
  };

  const changeHandlerCape = (event) => {
    setSelectedCape(event.target.files[0]);
    setIfCapePicked(true);
  };

  const handleFilesUpload = async () => {
    const formData = new FormData();

    if (isSkinPicked) {
      formData.append('nickname', user?.nickname);

      formData.append('skin', selectedSkin);

      const res = await uploadSkin(formData);

      if (res.nickname) {
        enqueueSnackbar('Скин был успешно обновлён!', { variant: 'success' });
        setOpen(false);
        router.reload(window.location.pathname);
      } else {
        enqueueSnackbar(res.msg, { variant: 'warning' });
      }
    }

    if (isCapePicked) {
      formData.append('skin', selectedCape);

      await uploadCape(formData);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyButton
        buttonIsCentered
        name='Изменить облик'
        callback={handleClickOpen}
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <DialogContent dividers>
          <Typography
            gutterBottom
            variant='h6'
            style={{ marginBottom: '30px' }}>
            Загрузите скин
          </Typography>
          <input type='file' name='file' onChange={changeHandlerSkin} />

          {user.type === 'ADMIN' && (
            <>
              <Typography gutterBottom variant='h6'>
                Загрузите плащ
              </Typography>
              <input type='file' name='file' onChange={changeHandlerCape} />
            </>
          )}
          <Typography
            gutterBottom
            variant='body2'
            style={{ maxWidth: '200px', margin: 'auto', opacity: 0.3 }}>
            Изменения вступят в силу после перезахода на сервер
          </Typography>
        </DialogContent>

        <DialogActions>
          <MyButton name={'Сохранить'} callback={handleFilesUpload} />
        </DialogActions>
        <DialogActions>
          <MyButton
            name={'Закрыть'}
            buttonType={ButtonTypes.SLIM}
            callback={handleClose}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
