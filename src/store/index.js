import { create } from "zustand";

// const initialState = {

// };

export const useDashStore = create(() => ({
  sensorData: {
    lines: [
      {
        name: 'Line 1',
        index: 0,
        data: [
          {
            name: 1,
            uv: 4000,
            pv: 2400,
            val: 2401,
          },
          {
            name: 2,
            uv: 3000,
            pv: 1398,
            val: 2210,
          },
          {
            name: 3,
            uv: 2000,
            pv: 6800,
            val: 2290,
          },
          {
            name: 4,
            uv: 2780,
            pv: 3908,
            val: 2025,
          },
          {
            name: 5,
            uv: 2780,
            pv: 3908,
            val: 3001,
          },
        ],
        showLine: true,
        newData: null,
      },
      {
        name: 'Line 2',
        index: 1,
        data: [],
        showLine: true,
        newData: null,
      },
      {
        name: 'Line 3',
        index: 2,
        data: [],
        showLine: true,
        newData: null,
      },
    ],
    lineCount: 3,
  },
  dialogIsOpen: false,
  recInfo: {
    isRecording: false,
    recData: [],
  },
  zoom: {
    zoomedIn: false,
    zoomedOut: true,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: 0,
    refAreaRight: 0,
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
    animation: true,
  },
}));

export const updateLineData = (newdata, lineIndex) => {
  return useDashStore.setState((state) => {
    const updatedLine = [...state.sensorData.lines];
    updatedLine[lineIndex] = { ...updatedLine[lineIndex], newData: newdata };
    return { sensorData: { ...state.sensorData, lines: updatedLine } };
  });
};

export const setAppendedData = (newdata, lineIndex) => {
  return useDashStore.setState((state) => {
    const updatedLine = [...state.sensorData.lines];
    updatedLine[lineIndex].data = [...updatedLine[lineIndex].data, newdata ];
    return { sensorData: { ...state.sensorData, lines: updatedLine } };
  });
};

export const addLine = () => {
  return useDashStore.setState((state) => ({
    sensorData: {
      ...state.sensorData,
      lines: [
        ...state.sensorData.lines,
        {
          name: `Line ${state.sensorData.lineCount + 1}`,
          index: state.sensorData.lineCount,
          data: [],
          newData: null,
          showLine: true,
        },
      ],
      lineCount: state.sensorData.lineCount + 1,
    },
  }));
};

export const setRecAppendedData = (newdata) => {
  return useDashStore.setState((state) => ({
    recInfo: { ...state.recInfo, recData: [...state.recInfo.recData, newdata] },
  }));
};

export const setClearRecData = () => {
  return useDashStore.setState((state) => ({
    recInfo: { ...state.recInfo, recData: [] },
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
