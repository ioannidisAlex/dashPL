import { create } from "zustand";

// const initialState = {

// };

export const useDashStore = create(() => ({
  sensorAllData: [
    {
      name: "1",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "3",
      uv: 2000,
      pv: 6800,
      amt: 2290,
    },
    {
      name: "4",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ],
  dialogIsOpen: false,
  recInfo: {
    isRecording: false,
    recData: null,
  },
  zoom: {
    zoomedIn: false,
    zoomedOut: true,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
    animation: true,
    // setRefAreaLeft: (refAreaLeft) => set({ refAreaLeft }),
    // setRefAreaRight: (refAreaRight) => set({ refAreaRight }),
    // setLeftRight: (left, right) => set({ left, right }),
    //resetZoom: () => set({ refAreaLeft: '', refAreaRight: '', ...initialState }),
  },
}));

//set appendeddata
export const setDataAppending = (newdata) => {
  return useDashStore.setState((state) => ({
    sensorAllData: [...state.sensorAllData, newdata],
  }));
};

export const setZoomedIn = (zoomedIn) => {
    return useDashStore.setState(() => ({ zoom: { zoomedIn: zoomedIn } }));
};

export const setZoomedOut = (zoomedOut) => {
    return useDashStore.setState(() => ({ zoom: { zoomedOut: zoomedOut } }));
};

export const setDialogState = (isOpen) => {
  return useDashStore.setState(() => ({ dialogIsOpen: isOpen }));
};

export const setRecordButtonState = (isRecording) =>
  useDashStore.setState((state) => ({
    recInfo: { ...state.recInfo, isRecording: isRecording },
  }));

export const setRefAreaLeft = (refAreaLeft) =>
  useDashStore.setState((state) => ({
    zoom: { ...state.zoom, refAreaLeft: refAreaLeft },
  }));

export const setRefAreaRight = (refAreaRight) =>
  useDashStore.setState((state) => ({
    zoom: { ...state.zoom, refAreaRight: refAreaRight },
  }));

export const setLeftRight = (left, right) =>
  useDashStore.setState((state) => ({
    zoom: { ...state.zoom, left: left, right: right },
  }));
