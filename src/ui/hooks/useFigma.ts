import { useCallback, useEffect, useState } from 'react';
import { request, response } from '@src/core/constants';

type PluginMessage = {
  type: response;
  data: any;
};

interface FigmaCoreEvent {
  pluginMessage?: PluginMessage;
}

const useFigma = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [selectedIcons, setSelectedIcons] = useState<number>(0);

  const save = useCallback(
    (data: any) => {
      setLoading(true);
      parent.postMessage(
        { pluginMessage: { type: request.CREATE_BUNDLE, data } },
        '*'
      );
    },
    [setLoading]
  );

  useEffect(() => {
    window.onmessage = (msg: MessageEvent<FigmaCoreEvent>) => {
      if (!msg.data?.pluginMessage) return;

      const { type, data } = msg.data.pluginMessage;

      switch (type) {
        case response.UPDATE_ICONS_NUMBER:
          setSelectedIcons(data as number);
          break;

        case response.SAVE:
          setLoading(false);
          console.log('>>> SAVING...', data);
          break;

        case response.ERROR:
          setError(data as string);
          break;
      }
    };

    return () => {};
  }, []);

  return { loading, selectedIcons, error, save };
};

export default useFigma;
