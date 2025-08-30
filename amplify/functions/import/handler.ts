import { DreamSchema } from '../../data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<DreamSchema>();

export const handler: DreamSchema["importJSON"]["functionHandler"] = async (event) => {
  
  const { data } = event.arguments;

  if (data) {
    const array:DreamSchema["Dream"]["type"][] = JSON.parse(data);
    array.forEach(doc => client.models.Dream.create(doc));
    return "OK: " + array.length;
  }
  
  return "KO";

};