import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface EditOptionsDialogProps {
  open: boolean;
  onClose: () => void;
  onEditSingle: () => void;
  onEditAll: () => void;
}

const EditOptionsDialog = ({
  open,
  onClose,
  onEditSingle,
  onEditAll,
}: EditOptionsDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>반복 일정 수정</DialogTitle>
      <DialogContent>
        <DialogContentText>해당 일정만 수정하시겠어요?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onEditSingle}>예</Button>
        <Button onClick={onEditAll}>아니오</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOptionsDialog;
