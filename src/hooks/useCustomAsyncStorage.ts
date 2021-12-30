import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

type useCustomAsyncStorageProps = {
  key: string;
};

const useCustomAsyncStorage = <T>({ key }: useCustomAsyncStorageProps) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState("");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const { getItem } = useAsyncStorage(key);

  useEffect(() => {
    execute();
  }, []);

  const execute = () => {
    setIsLoadingComplete(false);
    getItem()
      .then((res) => {
        if (res) {
          setResponse(JSON.parse(res) as T);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoadingComplete(true);
      });
  };

  return { response, error, isLoadingComplete };
};

export default useCustomAsyncStorage;
