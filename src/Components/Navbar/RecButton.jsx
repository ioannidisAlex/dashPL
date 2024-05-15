import { setRecordButtonState, useDashStore } from '../../store';
import { Icon } from '@chakra-ui/react';

export const RecButton = () => {
  // const [isActive, setIsActive] = useState(0);
  const {isRecording} = useDashStore((state) => state.recInfo);

  // useEffect(() => {
  //   if (isReccording) {
  //     setRecAppendedData([...recData, newSimulatedData]);
  //   }
  // }, [isReccording, sensorAllData]);

  return (
    <div
      className="mr-1 cursor-pointer  px-2 py-1 bg-black rounded-xl flex items-center justify-center"
      onClick={() => {
        setRecordButtonState(!isRecording);
      }}
    >
      {isRecording ? (
        <>
          <Icon viewBox="0 0 200 200" color="white">
            <rect fill="white" x="20" y="20" width="60" height="160" />
            <rect fill="white" x="124" y="20" width="60" height="160" />
          </Icon>
        </>
      ) : (
        <Icon viewBox="0 0 200 200" color="red">
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
      )}
    </div>
  );
};
