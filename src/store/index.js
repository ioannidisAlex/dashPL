import { create } from 'zustand'

// const initialState = {

// };

export const useDashStore = create(() => ({
    dialogIsOpen: false,
    recInfo: {
        isRecording:false,
        recData:null,
    },
}));

export const setDialogState = (isOpen) =>
    {
        return useDashStore.setState(() => ({ dialogIsOpen: isOpen }));
    };

export const setRecordButtonState = (isRecording) =>
    useDashStore.setState((state) => ({ recInfo: { ...state.recInfo, isRecording: isRecording } }));


