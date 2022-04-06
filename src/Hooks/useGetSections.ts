import axios from 'axios';
import { useQuery } from 'react-query';

type useGetSectionsType = {
  sections: { id: string; name: string; taskLimit: number }[];
  isLoading: boolean;
};

export const useGetSections = (): useGetSectionsType => {
  const getSections = () =>
    axios
      .get('https://chadsoft-kanban-backend.herokuapp.com/api/sections')
      .then((resp) =>
        resp.data.map((section: { [x: string]: any; name: any }) => ({
          id: section['_id'],
          name: section.name,
          taskLimit: section.taskLimit,
        }))
      );

  const { data, isLoading } = useQuery('sections', getSections);

  return data
    ? { sections: data, isLoading }
    : { sections: [], isLoading: false };
};
