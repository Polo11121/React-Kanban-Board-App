import axios from 'axios';
import { useQuery } from 'react-query';

type useGetSectionsType = {
  sections: { id: string; name: string; taskLimit: number }[];
  isInitialLoaded: boolean;
};

export const useGetSections = (): useGetSectionsType => {
  const getSections = () =>
    axios.get('http://localhost:3001/api/sections').then((resp) =>
      resp.data.map((section: { [x: string]: any; name: any }) => ({
        id: section['_id'],
        name: section.name,
        taskLimit: section.taskLimit,
      }))
    );

  const { data, isFetchedAfterMount } = useQuery('sections', getSections);

  return data
    ? { sections: data, isInitialLoaded: isFetchedAfterMount }
    : { sections: [], isInitialLoaded: false };
};
