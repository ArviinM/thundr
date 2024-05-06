import tresStatusData from '../types/TREStatus.json';
import {TREStatus} from '../types/TREStatus.ts';
interface TREStatusTranslation {
  [key: string]: {
    title: string;
    body: string;
  };
}

function getTresStatusMessage(status: TREStatus) {
  const tresStatus: TREStatusTranslation = tresStatusData;
  return {
    title: tresStatus[status]?.title,
    body: tresStatus[status]?.body,
  };
}

export default getTresStatusMessage;
