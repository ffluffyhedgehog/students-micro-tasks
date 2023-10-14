import { createState } from './state';
import { makePut } from './server-requests';

const [getState, setState] = createState({
  project: {
    id: '435345345',
  },
  fooData: {
    id: 'ad32234234',
    actionType: 'File Optimization Operation',
    fileList: ['asda.csv', 'oijij.tsv', 'qwenn.json'],
  },
  barData: {
    id: '654765467',
    actionType: 'Backup and Restore',
    fileList: ['asda.csv', 'oijij.tsv', 'qwenn.json'],
    backupLocation: 'thatIsSomeURL',
    backupProvider: 'protocol'
  },
  bazData: {
    id: '2342344353',
    actionType: 'Batch Analysis Zone',
    inputFiles: ['asd34.csv', '12321.csv'],
    outputFolder: './out/'
  },
  quxData: {
    id: '67856785678',
    actionType: 'Query and Update eXecution',
    executionId: '5435-32423-6443413',
    executorId: '5435-32423',
    schedule: 'daily'
  },
  fooLoader: false,
  barLoader: false,
  bazLoader: false,
  quxLoader: false,
  fooIsHighPriority: false,
});

/**
 * Performs a PUT request updating necessary provided data regarding a given action
 * and updates the state of the application according to the backend response
 * @param itemId: string
 * @param itemType: 'FOO' | 'BAR' | 'BAZ' | 'QUX'
 * @param chosenFile: string
 * @param newBackupProvider: object { location: string, protocol: string }
 * @param priority: 'high' | 'low'
 * @param additionalParameters: object { parameterA: string, parameterB: string }
 * @param schedule: 'daily' | 'hourly' | 'bidaily'
 * @returns {Promise<void>}
 */
export async function updateAction(
  itemId,
  itemType,
  chosenFile,
  newBackupProvider,
  priority,
  additionalParameters,
  schedule
) {
  const isFOO = itemType === 'FOO' ? 'File Optimization Operation' : 'Backup and Restore';
  const isBAR = itemType === 'BAR' ? 'Backup and Restore' : isFOO;
  const isBAZ = itemType === 'BAZ' ? 'Batch Analysis Zone' : isBAR;
  const type = itemType === 'QUX' ? 'Query and Update eXecution' : isBAZ

  if (type === 'File Optimization Operation') {
    setState({ ...getState(), fooLoader: true });
  } else if (type === 'Backup and Restore') {
    setState({ ...getState(), barLoader: true });
  } else if (type === 'Batch Analysis Zone') {
    setState({ ...getState(), bazLoader: true });
  } else if (type === 'Query and Update eXecution') {
    setState({ ...getState(), quxLoader: true });
  }

  const ID = itemId;
  if (chosenFile) {
    const fooData = getState().fooData;
    const barData = getState().barData;
    const makeB = () => {
      if (type === 'File Optimization Operation' && priority) {
        return {
          actionType: type,
          ...fooData,
          chosenFile,
          priority: chosenFile
        }
      } else if (type === 'File Optimization Operation' && !priority) {
        return {
          actionType: type,
          ...fooData,
          chosenFile,
        }
      } else if (type === 'Backup and Restore') {
        return {
          actionType: type,
          ...barData,
          chosenFile,
        }
      } else if (type === 'Batch Analysis Zone' && additionalParameters) {
        return {
          actionType: type,
          ...barData,
          chosenFile,
          additionalParameters
        }
      } else if (type === 'Batch Analysis Zone') {
        return {
          actionType: type,
          ...bazData,
          chosenFile
        }
      }
    }

    const newData = await makePut(`/project/${getState().project?.id}/action/${ID}`, makeB());

    if (newData.actionType === 'File Optimization Operation') {
      setState({
        ...getState(),
        fooData: newData,
        fooLoader: false
      });
    }
    if (newData.actionType === 'Backup and Restore') {
      setState({
        ...getState(),
        barData: newData,
        barLoader: false
      });
    }
    if (newData.actionType === 'Batch Analysis Zone') {
      setState({
        ...getState(),
        bazData: newData,
        bazLoader: false
      });
    }
  } else if (type === 'File Optimization Operation' && priority && !chosenFile) {
    const fooData = getState().barData;
    const newData = await makePut(`/project/${getState().project?.id}/action/${ID}`, {
      actionType: type,
      ...fooData,
      priority,
    });
    setState({
      ...getState(),
      fooData: newData,
      barLoader: false
    });
  }

  setState({
    ...getState(),
    fooIsHighPriority: type === 'File Optimization Operation' && priority ? true : false
  })

  if (type === 'Backup and Restore' && newBackupProvider) {
    const barData = getState().barData;
    const newData = await makePut(`/project/${getState().project?.id}/action/${ID}`, {
      actionType: type,
      ...barData,
      backupLocation: newBackupProvider.location,
      backupProvider: newBackupProvider.protocol,
    });
    setState({
      ...getState(),
      barData: newData,
      barLoader: false
    });
  }

  if (type === 'Batch Analysis Zone' && additionalParameters) {
    const bazData = getState().bazData;
    const newData = await makePut(`/project/${getState().project?.id}/action/${ID}`, {
      actionType: type,
      ...bazData,
      additionalParameters
    });
    setState({
      ...getState(),
      bazData: newData,
      bazLoader: false
    });
  }

  if (type === 'Query and Update eXecution') {
    const quxData = getState().quxData;
    const url = `/project/${getState().project?.id}/action/${ID}`;
    if (schedule && additionalParameters) {
      const newData = await makePut(url, {
        actionType: type,
        ...quxData,
        schedule,
        ...additionalParameters
      });
      setState({
        ...getState(),
        quxData: newData,
        quxLoader: false
      });
    } else if (schedule) {
      const newData = await makePut(url, {
        actionType: type,
        ...quxData,
        schedule,
      });
      setState({
        ...getState(),
        quxData: newData,
        quxLoader: false
      });
    } else if (additionalParameters) {
      const newData = await makePut(url, {
        actionType: type,
        ...quxData,
        ...additionalParameters
      });
      setState({
        ...getState(),
        quxData: newData,
        quxLoader: false
      });
    }
  }
}



